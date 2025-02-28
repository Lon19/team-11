import pandas as pd
import numpy as np
import requests
from flask import jsonify
import json

def get_new_ward(old_ward):
    ward_lookup = pd.read_csv('./backend/ward_to_merged_ward.csv')[['WD11CD', 'CMWD11CD']]
    ward_lookup.columns = ['new_ward', 'old_ward']

    return np.asarray(ward_lookup[ward_lookup['old_ward'] == old_ward]['new_ward'])

def get_old_ward(new_ward):
    ward_lookup = pd.read_csv('./backend/ward_to_merged_ward.csv')[['WD11CD', 'CMWD11CD']]
    ward_lookup.columns = ['new_ward', 'old_ward']

    return np.asarray(ward_lookup[ward_lookup['new_ward'] == new_ward]['old_ward'])[0]

new_ward_data = pd.read_csv('./backend/new_ward_data.csv')
old_ward_data = pd.read_csv('./backend/old_ward_data.csv')

# api_nomis['final_total'] = api_nomis['Total'] + api_nomis['Total.1']
# api_nomis = (api_nomis.drop(['Female', 'Female.1', 'Male', 'Male.1', 'Total', 'Total.1', 'GEOGRAPHY_NAME'], axis = 1))
# for i in range(0, len(new_ward_data)):
#     print(get_new_ward(new_ward_data['GEOGRAPHY_CODE'][i])[0])
#     new_ward_data['GEOGRAPHY_CODE'][i] = get_new_ward(new_ward_data['GEOGRAPHY_CODE'][i])[0]
#     if i % 1000 == 0:
#         print(i)

# print(new_ward_data.head())
new_ward_data = new_ward_data.set_index(verify_integrity = True, keys = ['GEOGRAPHY_CODE'])
new_ward_data = new_ward_data.rename(columns={"final_total" : "total"})
old_ward_data = old_ward_data.set_index(verify_integrity = True, keys = ['GEOGRAPHY_CODE'])
old_ward_data = old_ward_data.rename(columns={"final_total" : "total"})

def get_data():
    return new_ward_data.to_json(orient='index')

def get_data_old():
    return old_ward_data.to_json(orient='index')

# def download_hist_data():
#     for i in range(0, 24):
#         current_df = pd.read_csv('http://www.nomisweb.co.uk/api/v01/dataset/NM_162_1.data.csv?' +
#                                  'date=latestMINUS' + str(i) + '&' +
#                                  'geography=2092957697TYPE236&' +
#                                  'uid=&' + #!!!!ADD THE KEY FROM THE JS FILE HERE!!!!
#                                  'age=11,12&' +
#                                  'gender=0&' +
#                                  'select=geography_code,geography_name,gender_name,obs_value&' +
#                                  'measure=1&' + 
#                                  'rows=geography_code,geography_name&' +
#                                  'cols=gender_name&' + 
#                                  'measures=20100')
        
#         current_df['final_total'] = current_df['Total'] + current_df['Total.1']
#         current_df.drop(['GEOGRAPHY_NAME', 'Total', 'Total.1'], axis = 1, inplace = True)
#         current_df.to_csv('./backend/latest_minus_' + str(i) + '_months.csv')
#         return None

def get_ward_hist(ward):
    composite_df = pd.read_csv('./backend/latest_minus_0_months.csv')['GEOGRAPHY_CODE']
    for i in range(0, 24):
        temp_df = pd.read_csv('./backend/latest_minus_' + str(i) + '_months.csv', index_col = 0).drop(['GEOGRAPHY_CODE'], axis = 1)
        temp_df.columns = [str(i)]
        composite_df = pd.concat([composite_df, temp_df], axis=1, sort=False)
    composite_df = composite_df[composite_df['GEOGRAPHY_CODE'] == ward]
    composite_np = np.flip(np.asarray(composite_df))[0][0:-1]

    # for i in range(0, 24):
    #     composite_df[str(i)] = composite_np[i]
    # composite_df = composite_df.set_index(keys = ['GEOGRAPHY_CODE'])
    # return composite_df.to_json(orient = 'values')
    return json.dumps({ward:composite_np.tolist()})


def get_uk_analytics():
    av_uk = round(np.mean(old_ward_data['total']), 1)
    names = old_ward_data.index
    eng = [i for i in names if i.startswith('E')]
    eng_val = round(np.mean(old_ward_data.loc[eng, 'total']), 1)
    wal = [i for i in names if i.startswith('W')]
    wal_val = round(np.mean(old_ward_data.loc[wal, 'total']), 1)
    sco = [i for i in names if i.startswith('S')]
    sco_val = round(np.mean(old_ward_data.loc[sco, 'total']), 1)
    nir = [i for i in names if i.startswith('95')]
    nir_val = round(np.mean(old_ward_data.loc[nir, 'total']), 1)

    return jsonify({'uk':av_uk, 'england':eng_val, 'wales':wal_val, 'scotland':sco_val, 'ni':nir_val})

def get_ward_for_postcode(postcode):
    response = requests.get("http://api.postcodes.io/postcodes/"+str(postcode))
    data = json.loads(response.text)
    if data['status'] != 200:
        return json.dumps({"res":"fail", "reason":"Invalid postcode"})
    else:
        code = data["result"]["codes"]["admin_ward"]
    if code.startswith("S") or code.startswith("N"):
        return json.dumps({"res":"fail", "reason":"Due to missing data, Scotland and Northern Ireland are excluded from postcode lookup"})
    return json.dumps({"res":code})
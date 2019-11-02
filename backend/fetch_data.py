import pandas as pd
import numpy as np
import requests
from flask import jsonify
import json

api_nomis = pd.read_csv('./backend/nomis_data.csv').sort_values(by = ['GEOGRAPHY_NAME'])

api_nomis['final_total'] = api_nomis['Total'] + api_nomis['Total.1']
api_nomis = (api_nomis.drop(['Female', 'Female.1', 'Male', 'Male.1', 'Total', 'Total.1', 'GEOGRAPHY_NAME'], axis = 1))
api_nomis = api_nomis.set_index(verify_integrity = True, keys = ['GEOGRAPHY_CODE'])
api_nomis['GEOGRAPHY_CODE'].apply(get_new_ward)
api_nomis = api_nomis.rename(columns={"final_total" : "total"})

def get_data():
    return api_nomis.to_json(orient='index')

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

def get_new_ward(old_ward):
    ward_lookup = pd.read_csv('./backend/ward_to_merged_ward.csv')[['WD11CD', 'CMWD11CD']]
    ward_lookup.columns = ['new_ward', 'old_ward']

    return np.asarray(ward_lookup[ward_lookup['old_ward'] == old_ward]['new_ward'])

def get_uk_analytics():
    av_uk = round(np.mean(api_nomis['total']), 1)
    names = api_nomis.index
    eng = [i for i in names if i.startswith('E')]
    eng_val = round(np.mean(api_nomis.loc[eng, 'total']), 1)
    wal = [i for i in names if i.startswith('W')]
    wal_val = round(np.mean(api_nomis.loc[wal, 'total']), 1)
    sco = [i for i in names if i.startswith('S')]
    sco_val = round(np.mean(api_nomis.loc[sco, 'total']), 1)
    nir = [i for i in names if i.startswith('95')]
    nir_val = round(np.mean(api_nomis.loc[nir, 'total']), 1)

    return jsonify({'uk':av_uk, 'england':eng_val, 'wales':wal_val, 'scotland':sco_val, 'ni':nir_val})
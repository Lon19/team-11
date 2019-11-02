import pandas as pd
import numpy as np
import requests
from flask import jsonify

api_nomis = pd.read_csv('./backend/nomis_data.csv').sort_values(by = ['GEOGRAPHY_NAME'])

api_nomis['final_total'] = api_nomis['Total'] + api_nomis['Total.1']
api_nomis = (api_nomis.drop(['Female', 'Female.1', 'Male', 'Male.1', 'Total', 'Total.1', 'GEOGRAPHY_NAME'], axis = 1))
api_nomis = api_nomis.set_index(verify_integrity = True, keys = ['GEOGRAPHY_CODE'])
api_nomis = api_nomis.rename(columns={"final_total" : "total"})

def get_data():
    return api_nomis.to_json(orient='index')

def get_ward_hist(ward):
    return None

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
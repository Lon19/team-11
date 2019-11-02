import pandas as pd
import numpy as np
import requests

api_nomis = pd.read_csv('./backend/nomis_data.csv').sort_values(by = ['GEOGRAPHY_NAME'])

api_nomis['final_total'] = api_nomis['Total'] + api_nomis['Total.1']
api_nomis = (api_nomis.drop(['Female', 'Female.1', 'Male', 'Male.1', 'Total', 'Total.1', 'GEOGRAPHY_NAME'], axis = 1))
api_nomis = api_nomis.set_index(verify_integrity = True, keys = ['GEOGRAPHY_CODE'])
api_nomis = api_nomis.rename(columns={"final_total" : "total"})

def get_data():
    return api_nomis.to_json(orient='index')

def get_ward_hist(ward):
    return None
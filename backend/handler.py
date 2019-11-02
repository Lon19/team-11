from flask import Flask, jsonify, request
from flask_cors import CORS
import json

import fetch_data

app = Flask(__name__)
CORS(app)

@app.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({'res':'Hello, World!'})

@app.route('/ward-data', methods=['GET'])
def get_wards():
    return fetch_data.get_data()

@app.route('/ward-data-old', methods=['GET'])
def get_wards_old():
    return fetch_data.get_data_old()

@app.route('/ward-hist', methods=['GET'])
def get_ward_hist():
    return fetch_data.get_ward_hist(request.args.get('ward'))

@app.route('/uk-stats', methods=['GET'])
def get_uk_analytics():
    return fetch_data.get_uk_analytics()

@app.route('/map-data', methods=['GET'])
def get_map_data():
    with open('backend/map.json', 'r') as f:
        data = json.load(f)
    return data

@app.route('/postcode', methods=['GET'])
def get_ward_from_postcode():
    return fetch_data.get_ward_for_postcode(request.args.get('postcode'))

if __name__ == '__main__':
    app.run()
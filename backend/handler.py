from flask import Flask, jsonify, request
from flask_cors import CORS

import fetch_data

app = Flask(__name__)
CORS(app)

@app.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({'res':'Hello, World!'})

@app.route('/ward-data', methods=['GET'])
def get_wards():
    return fetch_data.get_data()

@app.route('/ward-hist', methods=['GET'])
def get_ward_hist():
    return fetch_data.get_ward_hist(request.args.get('ward'))

@app.route('/uk-stats', methods=['GET'])
def get_uk_analytics():
    return fetch_data.get_uk_analytics()

if __name__ == '__main__':
    app.run()
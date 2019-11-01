# import sys
# import requests

# def hello_world():
#     return "hello world"


# function = sys.argv[1]

# response = None

# if function == "hello_world":
#     response = hello_world()

# print(response)
# sys.stdout.flush()
#### This is all well and good but it makes things cliumsy trying to print all output to the command line

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({'res':'Hello, World!'})

if __name__ == '__main__':
    app.run()
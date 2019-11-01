import sys
import requests

def hello_world():
    return "hello world"

    
function = sys.argv[1]

response = None

if function == "hello_world":
    response = hello_world()

print(response)
sys.stdout.flush()

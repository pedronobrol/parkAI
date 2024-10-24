
from flask import Flask, request, jsonify
from model import model
import base64
import os
import time

app = Flask(__name__)

database = {}

database['spots'] = {'1': {'state': 'Libre', 'image': '', 'license': 'xxx'}, 
        '2': {'state': 'Libre', 'image': '', 'license': 'xxx'}, '3': {'state': 'Libre', 'image': '', 'license': 'xxx'}}


# Initialize model
dirModels = "../models/"  
md = model.Model(dirModels, "LPModelParking2.pt", "yolov5x.pt", "C:/Program Files/Tesseract-OCR/tesseract.exe")

def generate_id(board_id: str) -> str:
    '''
    Generate unique name for image with the following format separeted by -: 
    board_id 
        + 
    timestamp expressed in seconds floating point since epoch with two decimals 
    (if there is no decimals, the string will be filled up with 0's) without the dot.
        +
    .jpeg
    '''
    timestamp = str(round(time.time(),2))
    n_decimals = timestamp[::-1].find('.')

    if n_decimals != 2:
        timestamp = timestamp + '0'*(2-n_decimals) #Fill with zeros

    image_id = board_id + '-' + timestamp.replace(".","-") + '.jpeg'
    return image_id

@app.route('/spots',methods = ['GET'])
def parking_spots():
    r = jsonify(database['spots'])
    r.headers.add('Access-Control-Allow-Origin', '*')
    return r

@app.route('/test',methods = ['GET'])
def test_spot():
    new_state = database['spots']
    new_state['2']['state'] = 'Ocupado'
    database['spots'] = new_state
    return jsonify(database['spots'])

@app.route('/upload',methods = ['POST'])
def upload():
    global md

    #Generate image_id
    board_id = request.headers.get('Board').replace(';','')
    image_id = generate_id(board_id)

    #Save image
    request.files.get('imageFile').save('../client/parking/public/data/'+image_id)

    #Predictions
    sample =[image_id]
    license = md.predict('../client/parking/public/data/'+image_id)

    print(license)
    
    if not license:
        new_state = database['spots']
        new_state[board_id]['state'] = 'Libre'
        database['spots'] = new_state
        return 'false' 
    else:
        new_state = database['spots']
        new_state[board_id]['state'] = 'Ocupado'
        new_state[board_id]['image'] = image_id
        new_state[board_id]['license'] = license
        database['spots'] = new_state
        return 'true'  
  
app.run(host='xxx.xxx.xxx.xx', port=5000, debug = False)
#app.run(port=5000, debug = False)


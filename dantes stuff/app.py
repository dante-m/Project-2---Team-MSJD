import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Database Setup
#################################################

db = create_engine("sqlite:///data/baseballdata.sqlite")

results = db.execute("SELECT * FROM baseballdata_table")


#################################################
# Flask Routes
#################################################

@app.route("/")
def api_call():
    
    return render_template('index.html')
        
    

@app.route("/mlb_data")  
def index():
    data = db.execute("SELECT * From baseballdata_table;")
    
    blankarray = []
    for x in data:
        blankarray.append({"team name" : x["oteam_name"], "current team name" : x["cteam_name"], "league" : x["lg"], "wins" : x["w"], "loses" : x["l"], "ties" : x["t"], "win/lose ratio" : x["w_l"], "playoffs" : x["playoffs"], "attendance" : x["att"], "venue" : x["venue"], "city" : x["city"], "year" : x["year"],"lat" : x["lat"], "long" : x["lng"] })

    return jsonify(blankarray)

####################################################

if __name__ == '__main__':
    app.run(debug=True)

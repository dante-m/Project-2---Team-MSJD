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
app.config['JSON_SORT_KEYS'] = False

#################################################
# Database Setup
#################################################

db = create_engine("sqlite:///db/baseballdata.sqlite")

results = db.execute("SELECT * FROM baseballdata_table")

#################################################
# Flask Routes
#################################################

####  html routes ###################################

# @app.route("/")
# def index():
    
#     return render_template('index.html')

@app.route("/index.html")
def index():
    
    return render_template('index.html')
        
@app.route("/data.html")
def data():
    
    return render_template('data.html')

@app.route("/leaflet.html")
def map():
    
    return render_template('leaflet.html')

@app.route("/chart.html")
def humidity():
    
    return render_template('chart.html')

#####################################################################################
####api routes#########################################
@app.route("/mlb_data")  

def api_call():
    data = db.execute("SELECT * From baseballdata_table;")
    
    blankarray = []
    for x in data:
        blankarray.append({"team name" : x["oteam_name"], "current team name" : x["cteam_name"], "league" : x["lg"], "wins" : x["w"], "loses" : x["l"], "ties" : x["t"], "win/lose ratio" : x["w_l"], "playoffs" : x["playoffs"], "attendance" : x["att"], "venue" : x["venue"], "city" : x["city"], "year" : x["year"],"lat" : x["lat"], "long" : x["lng"] })

    return jsonify(blankarray)

@app.route("/mlb_data_table")  

def api_call2():
    data = db.execute("SELECT * From baseballdata_table;")
    
    blankarray = []
    for x in data:
        blankarray.append({"Year" : x["year"], "Team" : x["cteam_name"], "Stadium" : x["venue"],"Attendance" : x["att"], "Wins" : x["w"], "Losses" : x["l"], "W/L Ratio" : x["w_l"], "Playoffs" : x["playoffs"]})

    return jsonify(blankarray)

 
if __name__ == '__main__':
    app.run(debug=True)

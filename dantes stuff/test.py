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
########################optional sqlite medthod try if time#####################

db = create_engine("sqlite:///docs/resources/baseballdata.sqlite")

results = db.execute("SELECT * FROM baseballdata_table")

##############################################################################

####-this is db.excute method#######################################################
# connection_string = "postgres:postgres44@localhost:5432/baseball_db"
# db = create_engine(f'postgresql://{connection_string}')

# #mlbapi_results = db.execute("SELECT * FROM mlb_api")
# kaggle_csv_results = db.execute("SELECT * FROM kaggle_data")
# stadiums_csv_results = db.execute("SELECT * FROM stadiums_csv")
#####################################################################################

#auto base method below----
# reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(engine, reflect=True)

# # Save reference to the table
# kaggle_data = Base.classes.kaggle_csv
# mlbAPI = Base.classes.mlb_api





#################################################
# Flask Routes
#################################################

@app.route("/")
def api_call():
    
    return render_template('index.html')
        
    


@app.route("/mlb_data")  

# def index():
#     kaggle_csv_results = db.execute("SELECT kaggle_data.oteam_name, kaggle_data.year, Kaggle_data.lg, Kaggle_data.w, Kaggle_data.l, Kaggle_data.t, Kaggle_data.w_l, Kaggle_data.playoffs, Kaggle_data.att, Kaggle_data.cteam_name, stadiums_csv.team, stadiums_csv.venue, stadiums_csv.address, stadiums_csv.city, stadiums_csv.lat, stadiums_csv.lng FROM kaggle_data INNER JOIN stadiums_csv ON kaggle_data.cteam_name = stadiums_csv.team;")
    
#     blankarray = []
#     for x in kaggle_csv_results:
#         blankarray.append({"team name" : x["oteam_name"], "current team name" : x["cteam_name"], "league" : x["lg"], "wins" : x["w"], "loses" : x["l"], "ties" : x["t"], "win/lose ratio" : x["w_l"], "playoffs" : x["playoffs"], "attendance" : x["att"], "venue" : x["venue"], "city" : x["city"], "year" : x["year"],"lat" : x["lat"], "long" : x["lng"] })

#     return jsonify(blankarray)
################################################################

###################sqlite def ###############################################
def index():
    data = db.execute("SELECT * From baseballdata_table;")
    
    blankarray = []
    for x in data:
        blankarray.append({"team name" : x["oteam_name"], "current team name" : x["cteam_name"], "league" : x["lg"], "wins" : x["w"], "loses" : x["l"], "ties" : x["t"], "win/lose ratio" : x["w_l"], "playoffs" : x["playoffs"], "attendance" : x["att"], "venue" : x["venue"], "city" : x["city"], "year" : x["year"],"lat" : x["lat"], "long" : x["lng"] })

    return jsonify(blankarray)

##############################################################################

  ###automap base method app route stufff####
    # session = Session(engine)
  # results = session.query(mlbAPI).all()
    # session.close()

    # Convert list of tuples into normal list
    # all_team_names = list(np.ravel(results))
if __name__ == '__main__':
    app.run(debug=True)

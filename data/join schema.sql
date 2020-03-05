SELECT kaggle_data.oteam_name, kaggle_data.year, Kaggle_data.lg, Kaggle_data.w, Kaggle_data.l, Kaggle_data.t,Kaggle_data.w_l,Kaggle_data.playoffs, Kaggle_data.att, Kaggle_data.cteam_name, stadiums_csv.team, stadiums_csv.venue,stadiums_csv.address,stadiums_csv.city, stadiums_csv.lat, stadiums_csv.lng 
from kaggle_data
INNER JOIN stadiums_csv
ON kaggle_data.cteam_name = stadiums_csv.team;
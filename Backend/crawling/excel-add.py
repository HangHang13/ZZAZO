import openpyxl
import pandas as pd

test = pd.read_excel("excel-file/daejeon_kakao_all_data2.xlsx", usecols= ['_id', 'name', 'address', 'place_type', 'latitude', 'longitude', 'firstCategory', 'secondCategory'])
place_id = list(test['_id'].values)
name = list(test['name'].values)
address = list(test['address'].values)
place_type = list(test['place_type'].values)
latitude = list(test['latitude'].values)
longitude = list(test['longitude'].values)
firstCategory = list(test['firstCategory'])
secondCategory = list(test['secondCategory'])

avgscore = pd.read_excel("excel-file/daejeon_kakao_all_review_average2.xlsx", usecols=['name', 'placeScore'])
avgname = list(avgscore['name'].values)
placeScore = list(avgscore['placeScore'])
address_data = []

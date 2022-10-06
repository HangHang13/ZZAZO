import numpy as np
import pandas as pd

import pymysql
from openpyxl import Workbook

from sklearn.metrics.pairwise import cosine_similarity

from pymongo import MongoClient

from ZZAZO.settings.prod import *

host = 'mongodb+srv://S07P22B307:6bqIN7398L@ssafy.ngivl.mongodb.net/S07P22B307?authSource=admin'
port = 27017
username = 'S07P22B307'
password = mongo

def select_all_to_excel():
    conn = pymysql.connect(host='stg-yswa-kr-practice-db-master.mariadb.database.azure.com', user='S07P23B307@stg-yswa-kr-practice-db-master.mariadb.database.azure.com', password=mysql, db='S07P23B307', charset='utf8')
    wb = Workbook()
    try:
        with conn.cursor() as curs:
            sql = "select user_id, place_id, score from review_review"
            curs.execute(sql)
            rs = curs.fetchall()
 
            
            ws = wb.active
 
            #첫행 입력
            ws.append(('user_id','place_id','score'))
 
            #DB 모든 데이터 엑셀로
            for row in rs:
                ws.append(row)
 
            wb.save('./리뷰.xlsx')
    finally:
        conn.close()
        wb.close()

# 1. MySQL을 엑셀로 변환하여 저장한다.
select_all_to_excel()

# 2. 유사도 분석을 진행한다.
place = pd.read_excel("./ml-latest-small/daejeon_kakao_all_data2.xlsx")
kakao_ratings = pd.read_excel("./ml-latest-small/place_id_ratings.xlsx")
zzazo_ratings = pd.read_excel('./리뷰.xlsx')
ratings = pd.concat([kakao_ratings,zzazo_ratings])

# ratings 데이터와 place 데이터 결합
rating_place = pd.merge(ratings, place, on="place_id")

# 사용자-아이템 평점 행렬 생성
ratings_matrix = rating_place.pivot_table("score", "user_id", "place_id")

# NaN값은 0으로 변환
ratings_matrix.fillna(0, inplace=True)

# 아이템-사용자 평점 행렬로 전치
ratings_matrix_T = ratings_matrix.T

# 아이템 유사도 행렬
item_sim = cosine_similarity(ratings_matrix_T, ratings_matrix_T)

# 데이터 프레임 형태로 저장
item_sim_df = pd.DataFrame(item_sim, index=ratings_matrix_T.index, columns=ratings_matrix_T.index)

# 인수로 사용자-아이템 평점 행렬(NaN은 현재 0으로 대체), 아이템 유사도 행렬 사용
def predict_rating(ratings_arr, item_sim_arr):
    # ratings_arr: u x i, item_sim_arr: i x i
    sum_sr = ratings_arr @ item_sim_arr
    sum_s_abs = np.array( [ np.abs(item_sim_arr).sum(axis=1) ] )
    
    ratings_pred =  sum_sr / sum_s_abs
    
    return ratings_pred

# 사용자별 예측 평점
ratings_pred = predict_rating(ratings_matrix.values , item_sim_df.values)

ratings_pred_matrix = pd.DataFrame(data=ratings_pred, index= ratings_matrix.index,
                                columns = ratings_matrix.columns)

def predict_rating_topsim(ratings_arr, item_sim_arr, N=20):
    # 사용자-아이템 평점 행렬 크기만큼 0으로 채운 예측 행렬 초기화
    pred = np.zeros(ratings_arr.shape)

    # 사용자-아이템 평점 행렬의 열 크기(아이템 수)만큼 반복 (row: 사용자, col: 아이템)
    for col in (range(ratings_arr.shape[1])):
                
        # 특정 아이템의 유사도 행렬 오름차순 정렬시 index .. (1)
        temp = np.argsort(item_sim_arr[:, col]) 
        
        # (1)의 index를 역순으로 나열시 상위 N개의 index = 특정 아이템의 유사도 상위 N개 아이템 index .. (2)
        top_n_items = [ temp[:-1-N:-1] ]
        
        # 개인화된 예측 평점을 계산: 반복당 특정 아이템의 예측 평점(사용자 전체)
        for row in range(ratings_arr.shape[0]):
            
            # (2)의 유사도 행렬
            item_sim_arr_topN = item_sim_arr[col, :][top_n_items].T # N x 1
            
            # (2)의 실제 평점 행렬
            ratings_arr_topN = ratings_arr[row, :][top_n_items]     # 1 x N
            
            # 예측 평점
            pred[row, col] = ratings_arr_topN @ item_sim_arr_topN
            pred[row, col] /= np.sum( np.abs(item_sim_arr_topN) )
            
    return pred

print('예측 시작')
# 사용자별 예측 평점
ratings_pred = predict_rating_topsim(ratings_matrix.values , item_sim_df.values, N=20)
print('예측 완료')

# 예측 평점 데이터 프레임
ratings_pred_matrix = pd.DataFrame(data=ratings_pred, index= ratings_matrix.index,
                                columns = ratings_matrix.columns)

# 아직 가보지 않은 장소 리스트 함수
def get_unvisited_place(ratings_matrix, userId):

    # user_rating: userId의 아이템 평점 정보 (시리즈 형태: title을 index로 가진다.)
    user_rating = ratings_matrix.loc[userId,:]

    # user_rating=0인 아직 안본 영화
    unvisited_place_list = user_rating[ user_rating == 0].index.tolist()

    # 모든 장소명을 list 객체로 만듬. 
    place_list = ratings_matrix.columns.tolist()

    # 한줄 for + if문으로 안 가본 장소 리스트 생성
    unvisited_list = [ movie for movie in place_list if movie in unvisited_place_list]

    return unvisited_list

# 디비에 저장할 리스트 생성
def recomm_place_by_userid(pred_df, userId, unvisited_list):    
    recomm_place = pred_df.loc[userId, unvisited_list]

    return recomm_place

# 아직 가보지 않은 리스트
# unvisited_list = get_unvisited_place(ratings_matrix, ".")

# 아이템 기반의 최근접 이웃 협업 필터링으로 장소 추천
# recomm_unvisited_place = recomm_place_by_userid(ratings_pred_matrix, ".", unvisited_list)

# 데이터 프레임 생성
# recomm_unvisited_place_df = pd.DataFrame(data=recomm_unvisited_place.values, index=recomm_unvisited_place.index, columns=['pred_score'])





# 데이터 프레임 생성
# recomm_place_df = pd.DataFrame(data=recomm_place.values, index=recomm_place.index, columns=['pred_score'])

# 3. 짜조 유저만 추출한다.
zzazo_users = zzazo_ratings.user_id.unique()

# 3. 완료된 것을 몽고 DB에 저장한다.
print('저장 시작')
client = MongoClient(host=host, port=port, username=username, password=password)
db = client['S07P22B307']
target_col = db['recommend_score']
target_col.delete_many({})
place_list = ratings_matrix.columns.tolist()
for i in zzazo_users:
    recomm_place = recomm_place_by_userid(ratings_pred_matrix, i, place_list)
    recomm_place_df = pd.DataFrame(data=recomm_place.values, index=recomm_place.index, columns=['pred_score'])
    data = {"user_id": int(i)}
    for j in recomm_place_df.index:
        data[str(j)] = float(recomm_place_df['pred_score'][j])
    target_col.insert_one(data)
print('저장 완료')

# 이 형태로 저장
# 리뷰를 엑셀 파일로 만들어서 저장?
# {
#     'userid': 1,
#     'place_id': placeScore,
#     'place_id': 2,
#     ...    
    
# }
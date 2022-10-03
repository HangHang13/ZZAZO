# 크롤링 검색 재검색 o
import os
import requests, json, time
from time import sleep
from re import search
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import ElementNotInteractableException
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from pprint import pprint
import openpyxl
from tqdm import tqdm
options =  webdriver.ChromeOptions()
options.add_argument('headless')
options.add_argument('lang=ko_KR')
chromedriver_path = "C:/Users/multicampus/Desktop/chromedriver.exe"
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
cnt = 0
endpage = 0

# 엑셀 생성
wb = openpyxl.Workbook()
# sheet 활성
sheet = wb.active
# sheet Header( DB 컬럼 명 추가)
sheet.append(['name', 'imageUrl'])

    
def main(gu, dong):
    global driver, menu_wb
    start_time = time.time()
    driver.implicitly_wait(4)  # 렌더링 될때까지 기다린다 4초
    driver.get('https://map.kakao.com/')  # 주소 가져오기
    print(gu)
    print(dong)
    search(gu + dong)

    
    end_time= time.time()
    print(end_time - start_time)
    print("finish") 

def search(place):
    global driver
    searchdata = 0
    endpage = 0
    search_area = driver.find_element(By.XPATH,'//*[@id="search.keyword.query"]')  # 검색 창
    search_area.send_keys(place)  # 검색어 입력
    driver.find_element(By.XPATH, '//*[@id="search.keyword.submit"]').send_keys(Keys.ENTER)  # Enter로 검색
    sleep(1)

    # 검색된 정보가 있는 경우에만 탐색
    # 1번 페이지 place list 읽기
    sleep(2)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    sleep(1)
    place_lists = soup.select('.placelist > .PlaceItem') # 검색된 장소 목록
    crawling(place_lists)
    search_area.clear()

def crawling(placeLists):
    global cnt
    place = placeLists[0]
    place_name = place.select('.head_item > .tit_name > .link_name')[0].text
    detail_page_xpath = '//*[@id="info.search.place.list"]/li[1]/div[4]/span[1]/a'
    driver.find_element(By.XPATH, detail_page_xpath).send_keys(Keys.ENTER)
    driver.switch_to.window(driver.window_handles[-1])  # 상세정보 탭으로 변환
    review_more_xpaxh = '//*[@id="mArticle"]/div[@class="cont_photo  "]/div[@class="photo_area"]/a'
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    pprint(soup)
    test = soup.select("#mArticle > div.cont_photo > div.photo_area")
    pprint(test)
    if test != None:
        # ttt = test.select("#mArticle > div.cont_photo > div.photo_area > ul > li.size_l > a")
        # pprint(ttt)
        print(123)
    sleep(1)
if __name__ == "__main__":
    # gu = ['동구', '중구','서구', '유성구', '대덕구']
    # dong = [
    #     ['중앙동', '신인동', '효 동', '판암1동', '판암2동', '용운동', '대동', '자양동', '가양1동', '가양2동',
    #     '용전동', '성남동', '홍도동', '삼성동', '대청동', '산내동'],
    #     ['은행선화동', '목동', '중촌동', '대흥동', '문창동', '석교동', '대사동', '부사동', '용두동', '오류동', '태평1동', '태평2동', '유천1동', '유천2동', '문화1동', '문화2동', '산성동'],
    #     ['복수동', '도마1동', '도마2동', '정림동', '변동', '용문동', '탄방동', '둔산1동', '둔산2동', '둔산3동',
    #     '괴정동', '가장동', '내동', '갈마1동', '갈마2동', '월평1동', '월평2동', '월평3동', '만년동', '가수원동', '도안동', '관저1동', '관저2동', '기성동'],
    #     ['진잠동', '학하동', '원신흥동', '상대동', '온천1동', '온천2동', '노은1동', '노은2동', '노은3동', '신성동',
    #     '전민동', '구즉동', '관평동'],
    #     ['오정동', '대화동', '회덕동', '비래동', '송촌동', '중리동', '법1동', '법2동', '신탄진동', '석봉동', '덕암동',
    #     '목상동']
    # ]
    # for i, gv in tqdm(enumerate(gu)):
    #     for j, dv in tqdm(enumerate(dong[i])):
    #         main(gv, dv)
    main("대전 ", "유성구 성심당")
    # wb.save('daejeon_kakao_food_image.xlsx')
    print("저장 완료")
    driver.quit()
# 재검색 X
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
sheet.append(['name', 'place_type', 'address', 'latitude', 'longitude'])

def get_location(address):
    url = 'https://dapi.kakao.com/v2/local/search/keyword.json?query=' + address
    headers = {"Authorization": "KakaoAK a2acae25aa78ec3116e805da615fa383"}
    api_json = json.loads(str(requests.get(url,headers=headers).text))
    address_list = api_json['documents']
    for i in address_list:
        if i['place_name'] == address:
            address = i
            break
    else:
        return
    crd = {"lat": str(address['y']), "lng": str(address['x'])}
    # address_name = address['address_name']
    return crd

    
def main(gu, dong):
    global driver, menu_wb
    start_time = time.time()
    driver.implicitly_wait(4)  # 렌더링 될때까지 기다린다 4초
    driver.get('https://map.kakao.com/')  # 주소 가져오기
    print(gu)
    print(dong)
    search("대전 " + gu + " " + dong + " 음식점")

    driver.quit()
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
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    
    place_lists = soup.select('.placelist > .PlaceItem') # 검색된 장소 목록
    # 검색된 첫 페이지 장소 목록 크롤링하기
    searchdata = int((soup.select('.sectiontitle > .cntwrap> .cnt')[4].text).replace(",",""))
    print(searchdata)
    if searchdata % 15 != 0:
        endpage = int(searchdata / 15) + 1
    else:
        endpage = int(searchdata / 15)
    crawling(place_lists)
    search_area.clear()

    # 우선 더보기 클릭해서 2페이지
    try:
        driver.find_element(By.XPATH, '//*[@id="info.search.place.more"]').send_keys(Keys.ENTER)
        sleep(1)

        # 2~ 5페이지 읽기
        for i in range(2, endpage +1):
            # 페이지 넘기기
            if i % 5 == 1 :
                driver.find_element(By.XPATH, '//*[@id="info.search.page.next"]').send_keys(Keys.ENTER)
                sleep(1)
            else:
                xPath = '//*[@id="info.search.page.no' + str(i % 5 if i % 5 else 5) + '"]'
                driver.find_element(By.XPATH, xPath).send_keys(Keys.ENTER)
                sleep(1)

            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            place_lists = soup.select('.placelist > .PlaceItem') # 장소 목록 list

            crawling(place_lists)
            

    except ElementNotInteractableException:
        print('not found')
    finally:
        search_area.clear()
def crawling(placeLists):
    global cnt
    for place in placeLists:
        # menuInfos = getMenuInfo(i, driver)
        # print(menuInfos)
        place_name = place.select('.head_item > .tit_name > .link_name')[0].text
        place_type = place.select('.head_item > .subcategory')[0].text
        # place_star = place.select('.rating > .score > .num')[0].text
        place_address = place.select('.info_item > .addr > p[data-id=address]')[0].text
        cnt +=1
        print(cnt)
        print(place_name)
        print(place_type)
        # print(place_star)
        print(place_address)
        crd = get_location(place_name)
        print(crd)
        print("-----------------")
        if crd == None:
            crd = {'lat' : 0.0, "lng" : 0.0}
        sheet.append([place_name, place_type, place_address, crd.get('lat'), crd.get('lng')])
if __name__ == "__main__":
    gu = ['동구', '중구']
    dong = [
        ['중앙동', '신인동', '효 동', '판암1동', '판암2동', '용운동', '대동', '자양동', '가양1동', '가양2동',
        '용전동', '성남동', '홍도동', '삼성동', '대청동', '산내동'],
        ['은행선화동', '목동', '중촌동', '대흥동', '문창동', '석교동', '대사동', '부사동', '용두동', '오류동', '태평1동', '태평2동', '유천1동', '유천2동', '문화1동', '문화2동', '산성동']
    ]
    for i, gv in enumerate(gu):
        for j, dv in enumerate(dong):
            main(gv, dv[j])
        wb.save('daejeon_kakao_'+ gu + '_food.xlsx')
        print("저장 완료")
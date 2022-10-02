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
    print(address)
    url = 'https://dapi.kakao.com/v2/local/search/keyword.json?query=' + address
    headers = {"Authorization": "KakaoAK a2acae25aa78ec3116e805da615fa383"}
    api_json = json.loads(str(requests.get(url,headers=headers).text))
    if api_json['documents'] == []:
        return 
    address_list = api_json['documents'][0]
    
    address = address_list
    
    crd = {"lat": str(address['y']), "lng": str(address['x'])}
    # address_name = address['address_name']
    return crd
    
def main(gu):
    global driver, menu_wb
    start_time = time.time()
    driver.implicitly_wait(4)  # 렌더링 될때까지 기다린다 4초
    driver.get('https://map.kakao.com/')  # 주소 가져오기
    print(gu)
    search("대전 " + gu, gu)

    
    end_time= time.time()
    print(end_time - start_time)
    print("finish") 

def search(place, gu):
    global driver
    searchdata = 0
    endpage = 0
    search_area = driver.find_element(By.XPATH,'//*[@id="search.keyword.query"]')  # 검색 창
    search_area.send_keys(place)  # 검색어 입력
    driver.find_element(By.XPATH, '//*[@id="search.keyword.submit"]').send_keys(Keys.ENTER)  # Enter로 검색
    sleep(1)

    # 검색된 정보가 있는 경우에만 탐색
    # 1번 페이지 place list 읽기
    
    # 재검색 있을 경우
    # try:
    #     driver.find_element(By.XPATH, '//*[@id="info.searchHeader.message"]/div/div[2]/a').send_keys(Keys.ENTER)
    # except ElementNotInteractableException:
    #     print("No element exists")
    sleep(1)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    sleep(1)
    place_lists = soup.select('.placelist > .PlaceItem') # 검색된 장소 목록
    # 검색된 첫 페이지 장소 목록 크롤링하기
    print("장소 수")
    pprint(int((soup.select('#info\.search\.place\.cnt')[0].text)))
    
    searchdata = int((soup.select('#info\.search\.place\.cnt')[0].text).replace(",",""))
    # print(searchdata)
    if searchdata % 15 != 0:
        endpage = int(searchdata / 15) + 1
    else:
        endpage = int(searchdata / 15)
    if place_lists == []:
        return
    crawling(place_lists, gu)
    search_area.clear()

    # 우선 더보기 클릭해서 2페이지
    try:
        driver.find_element(By.XPATH, '//*[@id="info.search.place.more"]').send_keys(Keys.ENTER)
        sleep(1)

        # 2~ 5페이지 읽기
        for i in range(2, endpage +1):
            # 페이지 넘기기
            print(i)
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

            crawling(place_lists, gu)
            

    except ElementNotInteractableException:
        print('not found')
    finally:
        search_area.clear()
def crawling(placeLists, gu):
    global cnt
    for place in placeLists:
        # menuInfos = getMenuInfo(i, driver)
        # print(menuInfos)
        place_name = place.select('.head_item > .tit_name > .link_name')[0].text
        place_type = place.select('.head_item > .subcategory')[0].text
        place_star = place.select('.rating > .score > .num')[0].text
        place_address = place.select('.info_item > .addr > p[data-id=address]')[0].text
        cnt +=1
        print(cnt)
        print(place_name)
        print(place_type)
        print(place_star)
        print(place_address)
        crd = get_location(f"대전 {gu} {place_name}")
        print(crd)
        print("-----------------")
        if crd == None:
            crd = {'lat' : 0.0, "lng" : 0.0}
        sheet.append([place_name, place_type, place_address, crd.get('lat'), crd.get('lng')])
if __name__ == "__main__":
    category = ['테마거리', '공연', '테마카페']
    # gu = ['동구', '중구','서구', '유성구', '대덕구']
    for i, gv in enumerate(category):
        main(gv)
    wb.save('excel-file/daejeon_kakao_load_and_performance.xlsx')
    print("저장 완료")
    driver.quit()
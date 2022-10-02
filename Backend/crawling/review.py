import os
from tkinter.ttk import Style
import requests, json, time
import pandas as pd
from time import sleep
from re import search
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import ElementNotInteractableException, ElementClickInterceptedException, TimeoutException
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from pprint import pprint
import openpyxl
from tqdm import tqdm
from pprint import pprint

options =  webdriver.ChromeOptions()
options.add_argument('headless')
options.add_argument('lang=ko_KR')
chromedriver_path = "C:/Users/multicampus/Desktop/chromedriver.exe"
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
cnt = 0
endpage = 0

# 엑셀 불러오기
test = pd.read_excel("excel-file/daejeon_kakao_categoryetc2.xlsx", usecols= ['name', 'address'])
name_data = list(test['name'].values)
address = list(test['address'].values)
address_data = []

# 엑셀 생성
wb = openpyxl.Workbook()
# sheet 활성
sheet = wb.active
# sheet Header( DB 컬럼 명 추가)
sheet.append(['userNickName', 'placeName','content', 'score'])

def main(na, ad):
    global driver, menu_wb
    start_time = time.time()
    driver.implicitly_wait(4)  # 렌더링 될때까지 기다린다 3초
    driver.get('https://map.kakao.com/')  # 주소 가져오기
    print(ad + na)
    search(ad + na)
    # search("대전 유성구 성심당")
    

    
    end_time= time.time()
    print(end_time - start_time)
    print("finish") 

def search(place):
    global driver

    search_area = driver.find_element(By.XPATH,'//*[@id="search.keyword.query"]')  # 검색 창
    search_area.send_keys(place)  # 검색어 입력
    driver.find_element(By.XPATH, '//*[@id="search.keyword.submit"]').send_keys(Keys.ENTER)  # Enter로 검색
    

    # 검색된 정보가 있는 경우에만 탐색
    # 1번 페이지 place list 읽기
    
    sleep(1)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    # sleep(1)
    place_lists = soup.select('.placelist > .PlaceItem') # 검색된 장소 목록
    print(place_lists)
    if place_lists == []:
        return
    crawling(place_lists)
def crawling(placeLists):
    global cnt
    place = placeLists[0]
    place_name = place.select('.head_item > .tit_name > .link_name')[0].text
    review_cnt = place.select('#info\.search\.place\.list > li:nth-child(1) > div.rating.clickArea > span.score > a')[0].text
    print(review_cnt)
    try:
        if review_cnt == "0건":
            return
        else:
            detail_page_xpath = '//*[@id="info.search.place.list"]/li[1]/div[4]/span[1]/a'
            driver.find_element(By.XPATH, detail_page_xpath).send_keys(Keys.ENTER)
            driver.switch_to.window(driver.window_handles[-1])  # 상세정보 탭으로 변환
            sleep(1)
            cnt +=1
            extract_review(place_name)
    except ElementNotInteractableException:
        print("No element exists")
        return

def extract_review(place_name):
    global driver
    # review_more_xpaxh = '//*[@id="mArticle"]/div[7]/div[3]/a'
    review_more_xpaxh = '//*[@id="mArticle"]/div[@class="cont_evaluation  "]/div[@class="evaluation_review"]/a'
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    for i in range(1, 6):
        try:
            driver.find_element(By.XPATH, review_more_xpaxh).click()
            # asdf = "//span[text()='후기 더보기']"
            # ttt = driver.find_element(By.XPATH, asdf)
            # print(ttt)
            # if test == []:
            #     break
            # print(test)
            
            sleep(1)
        except NoSuchElementException:
            print("No element exists")
            break
        except ElementClickInterceptedException:
            print("No element exists")
            break
        except TimeoutException:
            print("No element exists")
            break
    ret = True

    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    # 첫 페이지 리뷰 목록 찾기
    review_lists = soup.select('.list_evaluation > li')

    # 리뷰가 있는 경우
    print(len(review_lists))
    if len(review_lists) != 0:
        for i, review in enumerate(review_lists):
            name = review.select('.unit_info > .link_user' )[0].text # 아이디
            comment = review.select('.txt_comment > span')[0].text # 리뷰

            rating = review.select('.grade_star > .ico_star > .ico_star') # 별점
            star = int(rating[0].attrs['style'][6:].replace('%;', '')) * 5 / 100
            print(name)
            print(comment)
            print(star)
            sheet.append([name, place_name,comment, star])
        driver.close()
        driver.switch_to.window(driver.window_handles[0])
    else:
        print('no review in extract')
        driver.close()
        driver.switch_to.window(driver.window_handles[0])
        ret = False

    return ret
    
    

if __name__ == "__main__":

    for i, ads in tqdm(enumerate(address)):
        adr = list(ads.split(' '))[:2]
        adrj = ' '.join(adr)
        address_data.append(adrj)
    for i, address_value in tqdm(enumerate(address_data)):
        main(name_data[i], address_value)
    wb.save('excel-file/daejeon_kakao_categoryetc2_review.xlsx')
    
    print("저장 완료")
    driver.quit()
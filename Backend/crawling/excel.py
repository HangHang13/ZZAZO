import os
import requests, json, time
import pandas as pd
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
from pprint import pprint
# options =  webdriver.ChromeOptions()
# options.add_argument('headless')
# options.add_argument('lang=ko_KR')
# chromedriver_path = "C:/Users/multicampus/Desktop/chromedriver.exe"
# driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
# cnt = 0
# endpage = 0

# 엑셀 불러오기
test = pd.read_excel("daejeon_kakao__food.xlsx", usecols= ['name', 'address'])
name = list(test['name'].values)
address = list(test['address'].values)
address_data = []
for i, ads in tqdm(enumerate(address)):
    adr = list(ads.split(' '))[:2]
    adrj = ' '.join(adr)
    address_data.append(adrj)
pprint(address_data)
# 😋ZZAZO - 약속 장소 추천 서비스

## **👇ZZAZO 소개👇**

![ZZAZOLOGO.png](https://user-images.githubusercontent.com/97587150/193963230-e4fea809-5924-4ec5-887e-fe30092abfc7.png)

[짜조UCC](https://youtu.be/umfKtU4Rcic)

ZZAZO 시연 시나리오는 👉[여기](exec/시연시나리오.md)👈에서 더 자세히 보실 수 있습니다.

# 목차

---

1. [서비스 소개](#ⅰ-서비스-소개)
2. [기술 스택](#ⅱ-기술스택)
3. [프로젝트 진행](#ⅲ-프로젝트-진행)

# **Ⅰ**. **서비스 소개**

---

## **✨서비스 설명**

---

### 개요

- 한줄 소개 : 약속 장소를 정하면 해당 위치에 따른 주변 장소들을 `카드 형태`로 `추천`해주고 `설계`하고 `공유`할 수 있는 `플랜 서비스`
- 서비스 명 : **ZZAZO**

### 이용 타겟

- **약속 코스** 또는 **데이트 코스**를 결정하기 힘든 사람들
- **약속 코스**를 알아볼 시간이 부족한 사람들
- 약속 지역에 존재하는 시설에 대한 정보가 부족한 사람들

### 📆개발 **기간**

---

**2022.08.22 ~ 2022.10.05**

## **✨ZZAZO의 모토**

`넌 놀기만 해! 일정은 내가 짜죠! 약속, 여행 다 짜조!`

## **✨기획 배경**

---

### 배경

- 모임이나 데이트, 여행 등에서 만나게 되는 약속 장소 (예를 들어 대학로 XX극장에서 연극 보기)는 정하였으나 식사, 카페, 오락 등 그 이후의 동선들과 활동들이 정해지지 않은 경험이 있음.
  - 세부적인 약속들을 잡는데 어려움을 겪음.
- 이러한 일정과 동선을 계획하는데 어려움을 겪고 힘들어하며 오게 되는 스트레스를 겪게 되는 상황들에 대한 공감대를 통해서 해당 문제에 대한 해결법을 생각해보고자 함.
- 처음으로 만나게 될 약속 장소를 정하면, 해당 장소에 따른 추천 장소들을 정해주고, 카테고리 별로 장소들을 분류해서 정할 수 있으며 카드 형태로 주어진 장소들을 통한 약속 일정을 만들고, 카카오톡 등을 통해 지인들에게 공유할 수 있는 서비스를 기획하게 됨.

### 기대 효과

- 처음으로 방문하는 약속 장소에 대한 일정을 계획하는 데 편의성 제공
- 약속 일정을 계획할 시간이 부족한 이들로 하여금 일정 계획 시간 단축
- 약속 장소를 결정하기 어려운 이들에게 추천 서비스 알고리즘을 통한 약속 장소 제공

## ⚡ZZAZO **서비스 화면**

---

ZZAZO 전체 서비스 화면은 👉[여기](exec/전체서비스.md)👈에서 더 자세히 보실 수 있습니다.

### **회원가입 시 초기 관심사 등록**

![회원가입 - 관심정보 입력](https://user-images.githubusercontent.com/97587150/194234014-3766aa47-c948-414f-a8af-0f4284d2e2f9.gif)

### **만남 장소 선택**

![약속장소선택 - 장소검색](https://user-images.githubusercontent.com/97587150/194234738-ca8bb10c-388c-4da6-a9ae-152304138543.gif)

### **약속 카드 생성**

- 약속카드에 장소 추가

![약속카드생성 - 약속카드 장소추가](https://user-images.githubusercontent.com/97587150/194235002-a7e20185-8167-4f75-bb60-2bde5983f753.gif)

- 새로고침 (새로 추천받기)

![약속카드생성 - 리로드](https://user-images.githubusercontent.com/97587150/194234978-96529b0e-3cca-4f55-ac7c-e8f1db0397ab.gif)

- 장소 리뷰 확인

![약속카드생성 - 리뷰 보기](https://user-images.githubusercontent.com/97587150/194234990-86960e68-d5f5-4a98-ba20-dc6a5c8aab84.gif)

- 장소 순서 정렬 기능

![약속카드생성 - 드래그앤드랍](https://user-images.githubusercontent.com/97587150/194234962-59069a2a-dbc4-4e10-a18d-8e2fba6e3312.gif)

- 약속카드 저장

![약속카드생성 - 저장](https://user-images.githubusercontent.com/97587150/194235013-a3d96a40-e423-4bea-b382-718f50486e69.gif)

### 약속 공유

![약속카드생성 - 카톡공유](https://user-images.githubusercontent.com/97587150/194235179-806c26ec-4773-4339-a2c8-7a6016fe919a.gif)

### **반응형 웹 디자인 구현**

![반응형2](https://user-images.githubusercontent.com/97587150/194316664-3c1d8b39-cd82-4813-ac6e-16657c8bf339.gif)
![반응형1](https://user-images.githubusercontent.com/97587150/194316671-aaa58344-be37-4f2a-a345-995a7270180b.gif)

## **✨ 주요 기능**

---

- 서비스 설명 : 약속 장소 추천 서비스
- 주요 기능 :
  - 약속 장소 선택 기능
    - 지도에서 원하는 위치 직접 선택 가능
    - 장소 검색을 통한 선택 기능
    - 사용자 위치 선택 기능
  - 세부 장소 추천 범위 설정
    - 반경 100m ~ 반경 1km 등 범위 다양하게 설정 가능
  - 세부 장소 카테고리 설정
    - 설정할 경우 설정한 카테고리에 해당하는 장소들만 추천(식사, 카페, 주류, 놀거리, 취미, 관람, 걷기 등)
    - 설정하지 않을 경우 자체적 추천 알고리즘으로 판단하여 사용자가 선호하는 장소 추천 (사용자와 유사도가 높은 다른 사용자들이 많이 이용한 장소 데이터 기반한 추천)
  - 세부 장소 추천
    - 점포 리스트 및 리뷰 크롤링
    - 리뷰와 평점 기반 장소 추천
    - KNN (협업 필터링) 알고리즘을 이용하여 장소 추천

# **Ⅱ. 기술스택**

---

## **🖥️ 개발 환경**

---

🖱**Frontend**
| <img src="https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg" alt="HTML5" width="50px" height="50px" /> | <img src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg" alt="CSS3" width="50px" height="50px" /> |
| :----------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: |
| HTML5 | CSS3 |

| <img src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React.js" width="50px" height="50px" /> | <img src="https://profilinator.rishav.dev/skills-assets/redux-original.svg" alt="Redux" width="50px" height="50px" /> |
| :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
|                                                               React                                                               |                                                         Redux                                                         |

| <img src="https://axios-http.com/assets/logo.svg" alt="MUI" width="50px" height="50px" /> | <img src="https://user-images.githubusercontent.com/46440898/185293492-b3242ac5-e146-43f5-a484-0e1aa4d45c3b.png" alt="Styled-Component" width="50px" height="50px"/> |
| :---------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                           AXIOS                                           |                                                                           Styled-Component                                                                           |

- VSCode (1.70.3)
- React (17.0.2)
- NodeJS (16.16.0)
- **Libraries**
  - axios (0.27.2)
  - npm (8.15.0)
  - react-beautiful-dnd (13.1.1)
  - react-calendar (3.9.0)
  - react-kakao-maps-sdk (1.1.3)
  - react-redux (8.0.2)
  - react-router-dom (6.3.0)
  - redux (4.2.0)
  - redux-persist (6.0.0)
  - redux-thunk (2.4.1)
  - styled-components (5.3.5)

🖱**Backend**

| <img src="https://user-images.githubusercontent.com/97587150/193996194-8c2ce207-af71-4943-9464-76d0791351d9.png" alt="Django" width="50px" height="50px" /> | <img src="https://user-images.githubusercontent.com/97587150/193996968-61cc51b7-0f47-4864-9b58-a6a35456e500.png" alt="MariaDB" width="50px" height="50px"/> | <img src="https://user-images.githubusercontent.com/97587150/193997027-2606aba3-85b5-4634-923c-c8be95a524e6.png" alt="MongoDB" width="50px" height="50px"/> |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                           Django                                                                            |                                                                           MariaDB                                                                           |                                                                           MongoDB                                                                           |

| <img src="https://res.cloudinary.com/postman/image/upload/t_team_logo/v1629869194/team/2893aede23f01bfcbd2319326bc96a6ed0524eba759745ed6d73405a3a8b67a8" alt="Postman" width="50px" height="50px" /> |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                               Postman                                                                                                |

- Django (4.1)
- djangorestframework (3.13.1)
- MariaDB (10.3.23)
- MongoDB (5.0.13)
- **Django 라이브러리**
  - selenuim (4.4.3)
  - PyJWT (2.4.0)
  - djongo (1.3.6)

🖱**BigData**

- Python (3.9.13)
- Numpy (1.22.2)
- Pandas (1.4.4)
- Scipy (1.9.1)
- scikit-learn (1.1.2)
- Matplotlib (3.1.2)
- Seaborn (0.9.0)

🖱**DevOps**

| <img src="https://user-images.githubusercontent.com/97587150/193992285-ad0b7049-5f86-499f-87d1-fb53371dba58.png" alt="docker" width="50px" height="50px" /> | <img src="https://user-images.githubusercontent.com/97587150/193991605-9848c286-ad9c-4d53-9b19-458e9804703a.png" alt="Jenkins" width="50px" height="50px" /> | <img src="https://user-images.githubusercontent.com/97587150/193993222-6951f668-ed70-4309-af56-a13e2123b8fe.png" alt="gunicon" width="50px" height="50px" /> | <img src="https://user-images.githubusercontent.com/97587150/193997335-5a4818b2-4ba2-4b7a-ac7a-e53b0091b9b0.png" alt="Nginx" width="50px" height="50px" /> | <img src="https://user-images.githubusercontent.com/97587150/193997434-3694af34-776f-4115-8e60-58820b5ff2c7.png" alt="EC2" width="50px" height="50px" /> |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                           docker                                                                            |                                                                           Jenkins                                                                            |                                                                           gunicon                                                                            |                                                                           Nginx                                                                            |                                                                           EC2                                                                            |

- ubuntu (20.04 LTS)
- docker (20.10.18)
- jenkins 2.361.1
- Nginx 1.18.0
- certbot 0.40.0

## **💫 서비스 아키텍처**

---

![시스템아키텍처](https://user-images.githubusercontent.com/97587150/194245723-bd0c2829-3488-4257-bc66-532f01a70add.png)

## **✨Kakao API[🔗](https://apis.map.kakao.com/)**

---

> 지도 라이브러리란?
> Kakao 지도 Javascript API 는 지도와 함께 사용할 수 있는 라이브러리 를 지원하고 있습니다.
> 라이브러리는 javascript API와 관련되어 있지만 조금 특화된 기능을 묶어둔 것을 말합니다. 이 기능은 추가로 불러와서 사용할 수 있도록 되어있습니다.
> 현재 사용할 수 있는 라이브러리는 다음과 같습니다.

> clusterer: 마커를 클러스터링 할 수 있는 클러스터러 라이브러리 입니다.<br/>
> services: 장소 검색 과 주소-좌표 변환 을 할 수 있는 services 라이브러리 입니다.<br/>
> drawing: 지도 위에 마커와 그래픽스 객체를 쉽게 그릴 수 있게 그리기 모드를 지원하는 drawing 라이브러리 입니다.

`services` 라이브러리를 통하여 지도 검색 기능에 대한 전반적인 기능들을 구현하였으며, `drawing` 라이브러리를 통해서 마커간의 동선을 구현하는데 사용하였습니다.

> 메시지 API는 사용자가 자신 또는 친구에게 카카오톡 메시지를 보내는 기능을 제공합니다. 서비스 정보를 간편하게 메시지로 공유하는 데 사용하는 카카오톡 공유 API, 서비스에서 사용자간 메시지를 보낼 수 있게 해 주는 카카오톡 메시지 API의 두 종류 메시지 API가 있습니다. 메시지 템플릿은 원하는 형태의 메시지와 콘텐츠를 편리하게 구성할 수 있도록 지원합니다.

> 카카오톡이 지원되는 환경이라면 모바일, 데스크톱, 태블릿까지 다양한 플랫폼에서 메시지를 활용할 수 있습니다. 메시지 API로 서비스 콘텐츠를 널리 퍼뜨리고, 사용자의 재방문을 유도해 보세요.

또한 카카오 `메시지 api`를 통하여 공유하기 기능을 구현하는데 사용하였습니다.

## **✨** Selenuim

---

> Selenuim 이란 ? python에서 웹 사이트 크롤링을 하기 위해 사용 되는 라이브러리입니다.
> html에서 가져온 데이터는 텍스트 형태의 html 입니다. 텍스트 형태의 데이터에서 원하는 html tag를 추출 할 수 있는 방법은 “BeautifulSoup” 를 이용하여 쉽게 가져올 수 있습니다.

<aside>
💡 BeautifulSoup : 텍스트형태의 데이터에서 원하는 html 태그를 가져올 수 있는 라이브러리
</aside>

## \***\*✨추천 알고리즘\*\***

### 협업 필터링

---

> 협업필터링 이란? 사용자의 구매 패턴이나 평점을 가지고 다른 사람들의 구매 패턴, 평점을 통해서 추천을 하는 방법입니다. 추가적인 사용자의 개인정보나 아이템의 정보가 없이도 추천할 수 있는게 큰 장점입니다.

### Neighborhood based Collaborative Filtering

---

Neighborhood based Collaborative Filtering은 메모리 기반 알고리즘으로 협업 필터링을 위해 개발된 초기 알고리즘입니다.

- **메모리 기반 알고리즘**(Neighborhood model 기준)은 유저와 아이템에 대한 matrix를 만든 뒤, 유저 **기반** 혹은 아이템 **기반**으로 유사한 객체를 찾은 뒤 빈공간을 추론하는 **알고리즘**입니다.

### KNN 알고리즘

---

K Nearest Neighbors는 가장 유사한 K 명의 Neighbors를 통해서 예측하는 방법입니다.

- 사용자 기반: 나와 비슷한 성향의 사람이 재밌게 본 영화 등을 추천하는 방식이다.
- 아이템 기반: 아이템에 대한 평가가 유사한 아이템을 추천하는 방식으로 일반적으로 성능이 더 뛰어나다.

협업 필터링 KNN 알고리즘 중 **아이템 기반 추천**으로 구현하였습니다.

### 문제점

---

1. 초기 사용자는 추천을 받지 못한다.
2. 기존 데이터가 많아야 추천을 받을 수 있다.
3. 알고리즘 실행 시간이 길다.

### 해결방안

---

1. 초기 사용자는 추천을 받지 못한다.
   - 초기 사용자는 데이터가 없어서 유사한 사용자를 찾을 수 없습니다.
   - 따라서 다른 추천을 통해 먼저 데이터를 쌓고 리뷰가 10개 이상인 사용자만 협업 필터링을 적용했습니다.
   - 다른 추천은 카테고리 일치하는 장소, 다른 사용자들이 많이 방문한 곳, 별점 순으로 장소 추천을 해주었습니다.
2. 기존 데이터가 많아야 추천을 받을 수 있다.
   - 기존 데이터가 없어서 카카오맵 리뷰를 크롤링하여 베이스 데이터를 만들었습니다.
3. 알고리즘 실행 시간이 길다.
   - 알고리즘 실행 시간이 6분 ~ 15분 정도 소요되었습니다.
   - 따라서 유저들이 잘 사용하지 않는 새벽 3시에 알고리즘을 한 번 돌리고 DB에 저장해서 알고리즘 결과를 DB에서 꺼내 쓸 수 있도록 만들었습니다.

### 결과

---

- 알고리즘을 통한 예상 별점

![Untitled](https://user-images.githubusercontent.com/97587150/194353488-65f6d761-883e-42f4-8b25-725d66ea2638.png)

- 실제 유저가 준 별점

![Untitled](https://user-images.githubusercontent.com/97587150/194353481-f937f9d6-8a39-4d37-ae64-b2383ec2ac8a.png)

- 약 `80%` 정도 일치하는 것으로 결과가 나왔습니다.
- MSE 성능 평가 점수는 약 `6.1164`이 나왔습니다.
- MSE 성능평가: `실제 값`과 `예측값의 차이`를 제곱해 평균한 것

## **✨배포**

---

자세한 사항은 다음을 참고해주세요.

[빌드 및 배포 가이드](exec/CICD%20%EB%A9%94%EB%89%B4%EC%96%BC.md)

### **✨ EC2 포트 정리**

---

| **PORT** |    **이름**     |
| :------: | :-------------: |
|   443    |      HTTPS      |
|    80    |   HTTP, nginx   |
|   8080   |     Jenkins     |
|   8000   | Django, gunicor |

## **👨‍👩‍👧협업 툴**

---

- Git
- Jira
- Notion
- Mattermost
- Webex
- Figma
- ERD cloud

# **Ⅲ. 프로젝트 진행**

---

저희 프로젝트는 `Agile`방식으로 개발을 진행하였고, 매주 월요일 Jira를 사용해 스프린트 일정관리를 하였고 매일 오전과 오후에 스크럼 회의를 진행하여 오전에는 당일 진행할 부분을 이야기하고 토론을 진행했고 오후에는 각 자 당일 진행한 부분을 토론하고 의견제시를 하는 식으로 진행하였습니다. Webex를 이용하여 각 Front, Back 세션을 만들어 각 분야끼리 소통하면서 개발을 진행하였고 `Troble Shooting` 이 발생하였을 경우 모여서 해결하는 방식으로 진행하였습니다.

## **🎨 화면 설계서**

---

![화면설계서1](https://user-images.githubusercontent.com/97587150/194183371-58067fe5-08bc-4800-ac93-e786e3726230.png)
![화면설계서2](https://user-images.githubusercontent.com/97587150/194183372-07ed0ef4-72e0-40b4-b528-8fecf3e72946.png)
![화면설계서3](https://user-images.githubusercontent.com/97587150/194183374-cb4ca936-d990-48e7-b7bc-39c719b79943.png)
![화면설계서4](https://user-images.githubusercontent.com/97587150/194183377-cb0733b0-8ed6-4602-9912-141c2b0b4120.png)

### **✨Git 컨벤션**

---

자세한 사항은 다음을 참고해 주세요.

[Git 컨벤션](exec/컨벤션/깃컨벤션.md)

### **✨Git Flow**

---

- Git Flow 전략 사용

![Git플로우](https://user-images.githubusercontent.com/97587150/193985155-7aa0e73c-38b3-4cee-a2c5-191d34f0b116.png)

- master 브랜치
  - 배포되는 브랜치
- develop 브랜치
  - 개발이 주로 이루어 지는 브랜치
- feature 브랜치
  - develop 에서 분기되는 브랜치
  - feat/BE or FE/<기능>
- hotfix 브랜치
  - develop에서 분기되는 브랜치
  - 수정이 필요한 경우 사용
  - fix/BE or FE/<기능>

### **👨‍👩‍👧 Jira**

---

협업 및 일정, 업무 관리를 위해 Jira를 이용하였습니다. 매주 월요일 오전 스크럼 회의에서 한 주동안 진행되어야 할 1주 단위 계획을 짜고, 진행할 이슈들을 스프린트를 만들어 등록했습니다. 스토리 포인트 1점당 1시간 단위의 작업량으로서 선정하였고, 스프린트는 일주일 단위로 진행하였습니다.

이 외에, 협업 메신저(Mattermost)에 알람을 등록하여 작업 상황을 실시간으로 확인할 수 있도록 했습니다.

### **👨‍👩‍👧 Notion**

---

모두가 봐야할 공지, 함께 선정해야하는 주제 및 초기 ERD, API 설계, 공부해야 할 링크, 개발 중 참고 링크, 트러블 슈팅, 간트 차트 등을 모아서 관리했습니다. 컨벤션 규칙 등도 노션에 기록하여 모두가 항시 확인할 수 있도록 관리했습니다.

[[팀 노션 바로가기]](https://www.notion.so/B307-924dcd959ef94b12a28555b4197f6d17)

### **✨ ER Diagram**

---

![ERD 전체](https://user-images.githubusercontent.com/97587150/193989105-fcfe4b92-5dc2-4da3-a996-d17f78ca0f97.png)

### **✨ 부하 테스트**

---

### case1#

- 홈 페이지
- 상황 : 점심시간처럼 사람이 몰리는 시간을 가정하여 부하테스트 실행
- 만명이 접속했을 때 응답시간 약 9초
  ![부하테스트-홈 갑자기.PNG](https://user-images.githubusercontent.com/97587150/194354592-8bd6335a-cbab-45a3-b7ee-ef4524e7ffb8.png)

### case2#

- 추천 페이지
- 상황 : 점심시간처럼 사람이 몰리는 시간을 가정하여 부하테스트 실행
- 대전광역시 중구 문화1동 근방을 추천받음
  ![부하테스트 점심시간.png](https://user-images.githubusercontent.com/97587150/194354601-92b92260-f34f-4453-afa1-030a4ae4c741.png)
- 690 명에서 서버초과

### case3#

- 홈 페이지
- 상황 : 서버 수정, 배포 후, 사용자가 몰리는 것을 가정하여 부하테스트 실행
- 초당 2천명씩 추가
  ![부하테스트-홈 갑자기.PNG](https://user-images.githubusercontent.com/97587150/194354581-c20c1eb1-46ac-4d25-8a70-5111def8ce18.png)
- 사용자 만명에서 응답시간 약 9초

### 결론

- 사용자가 690명 이상인 경우, 원활한 추천시스템을 활성화시키기 위해서
- 오토스케일링을 구성
  - 접속한 유저수가 600명 이상이 넘는 경우,
  - 인스턴스를 추가 활성화 시키는 방안 모색

### 👨‍👩‍👧‍👧 **개발 팀 소개**

---

<table>
<tr>
<td align="center" width="150px">
<a href="[https://github.com/platycodonv](https://github.com/platycodonv)" target="_blank">
<a href="https://github.com/platycodonv"><img height="100px" width="100px" src="https://user-images.githubusercontent.com/97587150/194244877-c44c608d-8764-4d06-8843-52f9dfe9caca.png" alt="김성수 프로필"/></a>
</a>
</td>
<td align="center" width="150px">
<a href="[https://github.com/tjsgnrla97](https://github.com/tjsgnrla97)" target="_blank">
<a href="https://github.com/tjsgnrla97"><img height="100px" width="100px" src="https://user-images.githubusercontent.com/97587150/194316910-c5a87c9c-4685-4b0a-ae52-eebd2f630a9d.jpg" alt="김선후 프로필"/></a>
</a>
</td>
<td align="center" width="150px">
<a href="[https://github.com/win9612](https://github.com/win9612)" target="_blank">
<a href="https://github.com/win9612"><img height="100px" width="100px" src="https://avatars.githubusercontent.com/u/64128134?v=4" alt="조민규 프로필"/></a>
</a>
</td>
<td align="center" width="150px">
<a href="[https://github.com/brotherweekkim](https://github.com/brotherweekkim)" target="_blank">
<a href="https://github.com/brotherweekkim"><img height="100px" width="100px" src="https://user-images.githubusercontent.com/97587150/194316907-c16834b6-c3a9-4b2c-bec2-d6a088c76bca.jpg" alt="김형주 프로필"/></a>
</a>
</td>
<td align="center" width="150px">
<a href="[https://github.com/SeongbaePark1105](https://github.com/SeongbaePark1105)" target="_blank">
<a href="https://github.com/SeongbaePark1105"><img height="100px" width="100px" src="https://user-images.githubusercontent.com/97587150/193962622-01d9f2ac-d151-4a11-8707-440685e4958d.png" alt="박성배 프로필"/></a>
</a>
</td>
<td align="center" width="150px">
<a href="[https://github.com/HangHang13/](https://github.com/HangHang13/)" target="_blank">
<a href="https://github.com/HangHang13/"><img height="100px" width="100px" src="https://user-images.githubusercontent.com/97587150/194316901-bf92ae01-54ed-4b95-a230-40e0547b99a0.jpg" alt="이진행 프로필"/></a>
</a>
</td>
</tr>
<tr>
<td align="center">
<a href="[https://github.com/rkarud1234](https://github.com/rkarud1234)" target="_blank">
김성수<br />(Front-end & 팀장)
</a>
</td>
<td align="center">
<a href="[https://github.com/tjsgnrla97](https://github.com/tjsgnrla97)" target="_blank">
김선후<br />(Front-end)
</a>
</td>
<td align="center">
<a href="[https://github.com/win9612](https://github.com/win9612)" target="_blank">
조민규<br />(Front-end)
</a>
</td>
<td align="center">
<a href="[https://github.com/brotherweekkim](https://github.com/brotherweekkim)" target="_blank">
김형주<br />(Back-end & Core)
</a>
</td>
<td align="center">
<a href="[https://github.com/SeongbaePark1105](https://github.com/SeongbaePark1105)" target="_blank">
박성배<br />(Back-end)
</a>
</td>
<td align="center">
<a href="[https://github.com/HangHang13/](https://github.com/HangHang13/)">
이진행<br />(Back-end & Infra)
</a>
</td>
</tr>
</table>

| 이름   | 역할               | 개발 내용                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 김성수 | (Front-end & 팀장) | - 와이어 프레임 디자인<br/> - Styled-Component를 이용한 CSS-in-JS 방식으로 스타일링 작업<br/> - 반응형 웹 디자인<br/> - 메인 페이지 디자인<br/> - 장소 상세 보기, 공유일정 장소 상세 보기 모달 구현<br/> - 메인페이지 추천 기능 구현<br/> - 공유 일정 리스트 Carousel 구현<br/> - 리뷰 작성 및 수정 구현                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 김선후 | (Front-end)        | - 와이어프레임 MyPage, Plan, PlanShare, NotFound<br/> - Styled-Component를 이용한 CSS-in-JS 방식으로 스타일링 작업<br/> - 반응형 웹 디자인<br/> - MyPage, UpdateProfile, UpdatePassword, DeleteProfile 페이지 디자인 및 기능 구현<br/> - ProfileImageListContent 모달 컴포넌트 구현<br/> - ProfileTitle, TabItem 컴포넌트 구현<br/> - Plan 페이지, Landing 컴포넌트 디자인 및 기능구현<br/> - Landing - GPS 기준 좌표설정<br/> - Landing - 지도 클릭 시 마커 생성<br/> - Landing - 키워드 검색<br/> - Landing - 주소-좌표 변환<br/> - Landing - 기존 바닐라형식 자바스크립트 api 코드 리액트 형식으로 사용.<br/> - PlanShare 페이지 디자인 및 기능구현<br/> - PlanShare - Redux를 활용한 위치 정보 상태 관리, 위치 정보 저장 기능 구현<br/> - NotFound 페이지 디자인 및 기능구현 |
| 조민규 | (Front-end)        | - 와이어프레임 디자인<br/> - 초기 스켈레톤 구조 설계 및 작성<br/> - Styled-Component를 이용한 CSS-in-JS 방식으로 스타일링 작성<br/> - 반응형 웹 디자인<br/> - 회원가입 페이지 개발<br/> - 아이디 / 비밀번호 찾기 페이지 개발<br/> - 로그인 페이지 개발<br/> - 약속카드 생성 페이지 개발<br/> - 공유일정 리스트 페이지 개발<br/> - 로그인 - Redux를 활용한 회원 정보 상태 관리, 아이디 저장 기능 구현<br/> - 로그인 - Axios Interceptor를 활용한 API 요청 전후 access token, refresh token 확인<br/> - 약속카드 생성 - 반경 설정 SeekBar 구현<br/> - 약속카드 생성 - 장소카드 Drag&Drop 기능 구현<br/> - 약속카드 생성 - 휴지통 기능 구현<br/> - 약속카드 생성 - 카카오맵을 활용한 약속카드 마커 생성 및 동선 표시<br/> - 로딩스피너 구현                                         |
| 김형주 | (Back-end & Core)  | - API 문서 작성<br/> - Place API 구현 및 보완<br/> - 반경 내 Place 조회 API 구현<br/>- 짜조 홈페이지 API 구현<br/> - place recommend API 구현 <br/> - Review API 구현 및 보완<br/> - 리뷰 작성 폼 API 구현<br/> - 리뷰 생성, 수정, 삭제 API 구현<br/> - Plan API 구현 및 보완<br/> - 몽고DB, MariaDB연결 및 보완<br/> - 협업 필터링으로 Recommend Algorithm 구현 <br/> - 추천 알고리즘 결과물 몽고 DB에 저장<br/> - 유저 관심 카테고리 중심 Recommend Algorithm 구현<br/> - 장소 별점 중심 Recommend Algorithm 구현<br/> - 많이 방문한 장소 중심 Recommend Algorithm 구현<br/> - LOCUST 를 활용해 부하테스트 실행                                                                                                                                                                |
| 박성배 | (Back-end)         | - Python selenuim을 이용해 카카오맵, 구글 크롤링<br/> 1. KAKAO (장소,카테고리,별점,리뷰,리뷰 내용,주소,카카오 API 를 이용하여 위도, 경도 값)<br/> 2. GOOGLE (MongoDB에 저장된 주소를 바탕으로 이미지 크롤링)<br/> - Place API 구현 및 보완<br/> - 장소에 자주 사용하는 연령, 성별 API 구현 <br/> - Review API 구현 및 보완<br/> - 별점 수정 API 구현<br/> - Plan API 구현 및 보완<br/> - 장소에 자주 사용하는 연령, 성별 API 구현<br/> - 약속 생성, 수정, 삭제 API 구현<br/> - MongoDB, MariaDB 연결<br/> - django DB router 설정 <br/> - LOCUST 를 활용해 부하테스트 실행                                                                                                                                                                                                       |
| 이진행 | (Back-end & Infra) | - DRF 구현<br/> - django swagger 구현<br/> - Accounts API 구현 및 보완<br/> - 로그인/로그아웃 API 구현<br/> - JWT Token, Refresh Token, Access Token <br/> - 회원 가입/ 회원 탈퇴 API 구현 <br/>- 회원 정보 수정 API 구현<br/> - 이메일, 닉네임 유효성검사 API 구현<br/> - 이메일 인증 API 구현 <br/> - 아이디 / 비밀번호 찾기 API 구현<br/> - 비밀번호 찾으면 비밀번호 난수로 변경 API 구현<br/> - LOCUST 를 활용해 부하테스트 실행 <br/> - Infra <br/>- 시스템 아키텍쳐 구성<br/> - Jenkins pipeline 설정 <br/>- Docker 설정<br/>- HTTPS 적용<br/>- CI-CD 구현                                                                                                                                                                                                                 |

---

<details>
<summary>
<h2>
이미지 출처
</h2>
</summary>
[404 취소 아이콘](https://kor.pngtree.com/freepng/cancel-vector-icon-with-transparent-background_5156945.html)
[프로필 이미지](https://kor.pngtree.com/freepng/a-group-of-small-animal-expressions_7390459.html?sol=downref&id=bef)
[마커 이미지](https://kor.pngtree.com/freepng/a-group-of-small-animal-expressions_7390459.html?sol=downref&id=bef)
</details>

---

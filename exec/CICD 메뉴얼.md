# ZZAZO CI CD manual

- Written By 이진행 @dhkdwlsgod
- 배포에 도움주신문 서울반 신민아님 @minahshin



# 사용기술

### Server

- Ubuntu 20.04 LTS

### Database

- MySQL
- MONGO
  - 장소, 이미지 크롤링 관련 데이터 베이스

### Container & Management

- Docker 20.10.18
- Docker Desktop
  - Local에서 도커 이미지 빌드 필요 시 사용

### SSL

- letsencrypt
  - certbot 0.40.0
  - 주의 : key값 저장 필요, 1도메인에 최대 5개까지만 발급 가능

### Proxy

- Nginx 1.18.0
  - 설정파일은 frontend의 dockerfile 및 <frontend_root>/conf/conf.d 에서 관리

### Deploy

- Jenkins 2.361.1

![1](/uploads/ca5c76057c773f3e48e6dde9a9cbc397/1.png)



### Architecture

![2](/uploads/1608487d9c6b0933b539255937556095/2.png)











## Dev env

### Frontend

- React 17.0.2
  - NodeJS 16.16.0
  - React-redux 8.0.2
  - React-router-dom 6.3.0
- VSCode 1.70.3

### Backend

- Django 4.1.1
  - djangorestframework 3.13.1
- VS Code 1.70.0

### External Libraries

- BigData
  - Python (3.9.13)
  - Numpy (1.22.2)
  - Pandas (1.4.4)
  - Scipy (1.9.1)
  - scikit-learn (1.1.2)
  - Matplotlib (3.1.2)
  - Seaborn (0.9.0)

### Git Branch Strategy

- Gitflow 전략 활용

![3](/uploads/10b4095cb3b1af853127f3b213e609f7/3.png)





# 방법

## EC2 설정

1. apt-get 최신화

   ```bash
   sudo apt-get update
   ```

2. ec2에 docker를 설치한다

   ```sh
   sudo apt-get install -y ca-certificates \
       curl \
       software-properties-common \
       apt-transport-https \
       gnupg \
       lsb-release
   ```

   - gpi key받기
   - 도커를 설치하기 위해 gpg Key를 다운받아야 합니다. 이는 리눅스 패키지 툴이 프로그램 패키지가 유효한지 확인하기 위해 설치 전에 gpg 키를 통해 검증하는 과정을 거치기 때문에 gpg 키를 받아야 한다고 합니다.

   ```sh
   sudo mkdir -p /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   
   echo \
       "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
       $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

   

   ```bash
   sudo apt-get install docker-ce docker-ce-cli containerd.io
   
   # docker.sock 권한 변경
   # docker를 재시작할때마다 아래의 명령어 입력 필요
   chmod 666 /var/run/docker.sock
   
   ```

3. ec2에 letsencrypt를 이용하여 ssl 인증서를 받는다

   ```bash
   sudo apt-get install letsencrypt
   sudo letsencrypt certonly -a —standalone -d <DOMAIN>
   ```

   - etc/letsencrypt/live/도메인폴더 에
   - cert.pem , chain.pem, fullchain.pem privkey.pem 있는지 확인한다.

4. ec2에 Nginx를 설치한다

   ```bash
   sudo apt-get install nginx
   ```

## Frontend 설정

1. EC2에 프로젝트와 동일한 node.js 버전 및 npm 설치

   ```bash
   # nodejs 설치
   sudo apt install nodejs@<YOUR_VERSION>
   
   # npm 설치
   sudo apt install npm
   ```

2. 프로젝트 최상단에 Dockerfile 작성

   - Dockerfile

     ```dockerfile
     FROM node:16.16.0 as build-stage
     
     # 워크 디렉토리 설정
     WORKDIR /Frontend
     COPY . .
     RUN npm install
     RUN npm run build
     
     # nginx 설정
     FROM nginx:stable-alpine as production-stage
     
     RUN rm -rf /etc/nginx/conf.d
     
     COPY conf /etc/nginx
     
     COPY --from=build-stage /Frontend/build /usr/share/nginx/html
     
     # nginx 기본 포트인 80번을 사용
     EXPOSE 80
     
     ENTRYPOINT ["nginx", "-g", "daemon off;"]
     
     
     ```

3. 프로젝트 최상단 하위에 conf/conf.d 폴더 생성 후 default.conf(복사용 nginx conf 파일) 생성 필요

   - default.conf

- certbot  적용 전

```nginx
#default.conf

server {
    listen 80;
    server_name j7b307.p.ssafy.io; # 도메인으로 변경
    

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;

    }
  
    location /api {
        proxy_pass http://j7b307.p.ssafy.io:8000;
        proxy_set_header Host $http_host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host $server_name;
    }
}


```

- nginx로 배포하므로 frontend는 80포트로 배포



- certbot 적용 후 

```nginx
#default.conf

server {
        listen 80;
        listen [::]:80;

        server_name i7a504.p.ssafy.io;
        rewrite ^(.*) https://j7b307.p.ssafy.io$1 permanent;
}

server {
        listen 443 ssl;
        listen [::]:443;

        server_name i7a504.p.ssafy.io;

        ssl_certificate /etc/letsencrypt/live/j7b307.p.ssafy.io/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/j7b307.p.ssafy.io/privkey.pem;

        location / {
                root /usr/share/nginx/html;
                index index.html index.htm;
                try_files $uri $uri/ /index.html;
        }

        location /api {
        proxy_pass http://j7b307.p.ssafy.io:8000;
        proxy_set_header Host $http_host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host $server_name;
    }
}
```



## Backend 설정

1. 프로젝트 최상단에 Dockerfile 작성

   - Dockerfile

     ```dockerfile
     FROM python:3.9.13
     
     # 워크 디렉토리 설정
     WORKDIR /Backend
     
     # requirements.txt에 명시된 필요한 packages 설치
     COPY requirements.txt ./
     RUN pip install --upgrade pip
     RUN pip install -r requirements.txt
     COPY . .
     
     # 포트 설정
     EXPOSE 8000
     
     # gunicorn 실행
     CMD ["gunicorn","--bind","0.0.0.0:8000","ZZAZO.wsgi:application"]
     
     ```

- server.port 는 8000(기본값)으로 사용

- django는 gunicorn으로 nginx와 통신함



### jenkins 설정



1. apt 업데이트

```sh
sudo apt-get update
```

2. jdk설치
   - JDK 8 이상의 원하는 버전을 설치한다.

```shell
sudo apt-get install openjdk-11-jdk
```

3. Jenkins 저장소 Key 다운로드

```shell
wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add -
```

4. sources.list.d 에 jenkins.list 추가

```shell
echo deb http://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list
```

5. Key 등록

```shell
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys FCEF32E745F2C3D5
```

6.  apt-get 재 업데이트

```shell
sudo apt-get update
```

7.  Jenkins 설치

```shell
sudo apt-get install jenkins
```

8. Jenkins 서버 포트 번호 변경

```shell
sudo vi /etc/default/jenkins
```

 

![img](https://blog.kakaocdn.net/dn/ca6tkX/btrp6v9WinB/kfsVaKvujWa2wC6pJpcsm0/img.png)

이 부분에서 젠킨스 포트로 사용할 원하는 포트를 입력하고 저장한다.

9. Jenkins 서비스 재시작

```shell
sudo service jenkins restart
```

10. Jenkins 서비스 상태 확인

```shell
sudo systemctl status jenkins
```

11. Jenkins 초기 비밀번호 확인

```
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

12. 지정포트로 들어가서 확인

![4](/uploads/ab7bcaf3121c66f8974168cf75af4ac6/4.png)

- 위의 비밀번호를 복사하고 입력한다.

13. 세부사항 설치
    1. Install suggested plugin 클릭
    
       
    
       ![5](/uploads/b2b1001e07a483e603b620b9d8c8beed/5.png)
    
       ![6](/uploads/291f1b7f02ad7f5b628c0664d73fc0bf/6.png)
    
       
    
    2. 계정을 생성한다.
    
       아무거나 입력해도 되지만, 계정 아이디랑 비밀번호를 까먹으면 귀찮아진다(찾을 수 있긴 함)
    
       ![7](/uploads/e6f118c73a80846b8211a74f9315a8ee/7.png)
    
       ​		
    
       ​	
    
       
    
    3. 필요한 플러그인 등을 설치해준다.
    
       
    
       ![8](/uploads/8b97c0193e4b759b362fa69340c0e6d6/8.png)
    
       
    
       
    
       1. git-lab 관련 플러그인 설치
    
          ![9](/uploads/b93e8dc62e8fee9197cbd4b2ce4885e6/9.png)
    
          
    
       2. ssh over 플러그인 설치
    
          ![10](/uploads/e0e0fd57f8c8827992106d76dca4f321/10.png)
    
          
    
       3. nodejs(프론트엔드와 같은 nodejs 버전 사용) 설치



14. 젠킨스 sudo 권한 설정

    1. sudo -i 로 super계정으로 접근

    2. sudors 파일 열기

       ```sh
       cd /etc/sudoers.d
       ```

       

    3. jenkins 파일 생성

       ```sh
       touch jenkins
       ```

       

    4. jenkins 파일 내용의 마지막 줄에 jenkins ALL=(ALL) NOPASSWD: ALL 추가

       ```sh
       vi jenkins
       jenkins ALL=(ALL) NOPASSWD: ALL
       
       ```

    4. jenkins 파일에 보안을 위해 권한을 지정



## frontend

1. frontend config file 설정

   ```sh
   # .env 파일같이 git에 올리면 안되는 파일 작성
   cd /var/lib/jenkins/workspace/<jenkins_project_name>/<real_project_name>
   vi .env
   ```

​					

### Backend - Jenkins

1. backend config file 설정

   ```sh
   cd /var/lib/jenkins/workspace/<jenkins_project_name>/**/src/main/resource
   vi <YOUR_APPLICATION_CONFIG_FILE> # ex) application-server.yml
   ```

2. Jenkins 설정

   1. Freestyle project로 생성

   - 사진





## 젠킨스 프로젝트 설정

- 디렉토리 설정

```bash
cd 

mkdir B307
cd B307
git clone 레파지토리
```





1. 프로젝트 이름 기입 후, 프리스타일 프로젝트 선택

![11](/uploads/82683691946462119b8eb458cbc5209e/11.png)



2. git 에 체크하고 Repositories URL에 연동할 깃 url 기입 후 add, jenkins 클릭

![12](/uploads/be2cd1cd89393f6032161a889eab5d04/12.png)



3. 깃랩 아이디, 비밀번호 입력

![13](/uploads/3f737d82ddfd773db9907af4c4cf193a/13.png)



- 입력하면 빨간줄이 안뜨면 성공!

![14](/uploads/0ae67237b5692af636cc3722f72b128f/14.png)



4. 자동으로 빌드되고 싶은 것들 체크
   - Push Event랑 Merge Event의 경우에만 감지하고 빌드하도록 했다.

![15](/uploads/e5cc6f644f54617415ebdbc771451a1d/15.png)







5. generate 버튼으로 토큰 생성

![16](/uploads/29884bc5a737c3c6acfa7bfc6481c12c/16.png)



6. 빌드 항목에서 Excute shell 클릭

![17](/uploads/563e51a8e9882854147e3f1092fc3930/17.png)



- pwd 적어보기

![18](/uploads/b5c004afb64be9327bd9cfddc903ab25/18.png)



7. Jenklins 대쉬보드에서 지금 빌드 클릭

![19](/uploads/abfd8f400627af160981c4c294cf7ce6/19.png)



- 초록불이면 빌드 성공, console output 클릭

![20](/uploads/4095b479008ef93f19b3048951e61f03/20.png)



- 빌드 내용이 나온다.

![21](/uploads/e5c80e8ef87f9e17758e97cd47467d30/21.png)



8. 깃랩과 젠킨스 연결해주기

- 깃랩 Webhoos 클릭하고
- URL에 http://<도메인 이름>/project/<젠킨스 프로젝트 이름>/ 입력
- Trigger
  - Push events에 배포되고자하는 브랜치 설정 (master)
  - Merge request events

![22](/uploads/e38454675dc62b866b1832ab9d45d6f0/22.png)



- Sercret token에 Jenkins에서 generate으로 설정한 토큰 입력하기

![23](/uploads/d4ef49d32e70dc71f1bb9b863bf1160d/23.png)



- Add webhook을 클릭
- Test클릭후 Push events 클릭

![24](/uploads/2cac405a0066c1a64d50f0e3e1d3be66/24.png)



- 200이 뜨면 성공!

![25](/uploads/1958788786b3c0e6816e4996d4a2ece9/25.png)



- 젠킨스 대쉬보드에서 상태 클릭
  - 초록불이면 성공!

![26](/uploads/3622c42a4f7b683f52032fb6641104f9/26.png)



9. 빌드 설정하기

![27](/uploads/2adc7783512f0d90e833663ae6ddf516/27.png)



```shell
docker stop backend | true
docker stop frontend | true
docker rm backend | true
docker rm frontend | true
docker image prune -a --force

cd Frontend
sudo docker build -t frontend .
cd ..
cd Backend
sudo docker build -t backend .

if (sudo docker ps | grep "backend"); then sudo docker stop backend; fi
if (sudo docker ps | grep "frontend"); then sudo docker stop frontend; fi


sudo docker run -it -d -p 80:80 -p 443:443 --name frontend -v /etc/letsencrypt/:/etc/letsencrypt/ frontend 

echo "Run frontend"
sudo docker run -it -d -p 8000:8000 --name backend backend
echo "Run backend"
```





## DB 설정 (필수는 아님)

### 1. mariaDB

- 설치

```
docker pull mariadb:<버전>
```



- 실행

```
docker run --name mariadb -e MYSQL_ROOT_PASSWORD=mypass -p 3306:3306 -d mariadb
```



### 2. mongoDB

- 설치

```
docker pull mongo
```



- 실행

```
docker run --name mongodb-container -v ~/data:/data/db -d -p 27017:27017 mongo
```


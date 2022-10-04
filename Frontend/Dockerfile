FROM node:16.16.0 as build-stage
WORKDIR /Frontend
# WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

# nginx configuration
FROM nginx:stable-alpine as production-stage

RUN rm -rf /etc/nginx/conf.d

COPY conf /etc/nginx

COPY --from=build-stage /Frontend/build /usr/share/nginx/html
# COPY /etc/letsencrypt/live/j7b307.p.ssafy.io/fullchain.pem /etc/letsencrypt/live/j7b307.p.ssafy.io//fullchain.pem
# COPY /etc/letsencrypt/live/j7b307.p.ssafy.io/privkey.pem /etc/letsencrypt/live/j7b307.p.ssafy.io//privkey.pem
# nginx 기본 포트인 80번을 사용
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]



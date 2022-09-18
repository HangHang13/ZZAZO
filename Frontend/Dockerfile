FROM node:16.16.0 as build-stage
WORKDIR /var/jenkins_home/workspace/B307/Frontend
COPY package*.json ./
RUN npm config rm proxy
RUN npm config rm https-proxy
# RUN npm config set proxy null
# RUN npm config set https-proxy null
RUN npm config set registry 
RUN npm i -g npm@8.5.1
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/B307/Frontend/build /usr/share/nginx/html
#COPY --from=build-stage /var/jenkins_home/workspace/deploytest/testproject_react/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]
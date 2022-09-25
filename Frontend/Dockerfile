FROM node:16.16.0 as build-stage
WORKDIR /jenkins/workspace/deploy/Frontend
COPY package*.json ./
# RUN npm config rm proxy
# RUN npm config rm https-proxy
# RUN npm config set fetch-retry-mintimeout 20000
# RUN npm config set fetch-retry-maxtimeout 120000
# RUN npm config set proxy null
# RUN npm config set https-proxy null
# RUN npm config set registry 
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /jenkins/workspace/deploy/Frontend/build /usr/share/nginx/html
COPY --from=build-stage /jenkins/workspace/deploy/Frontend/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
CMD ["npm", "run", "start"]
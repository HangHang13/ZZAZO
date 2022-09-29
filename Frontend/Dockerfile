FROM node:16.16.0 as build-stage
# WORKDIR /var/jenkins_home/workspace/deploy/Frontend
# COPY package*.json ./
# # RUN npm config rm proxy
# # RUN npm config rm https-proxy
# # RUN npm config set fetch-retry-mintimeout 20000
# # RUN npm config set fetch-retry-maxtimeout 120000
# # RUN npm config set proxy null
# # RUN npm config set https-proxy null
# # RUN npm config set registry 
# RUN npm install
# COPY . .
# RUN npm run build
# FROM nginx:stable-alpine as production-stage

# COPY --from=build-stage /var/jenkins_home/workspace/deploy/Frontend/build /usr/share/nginx/html
# COPY --from=build-stage /var/jenkins_home/workspace/deploy/Frontend/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
# # EXPOSE 3000
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
# CMD ["npm", "run", "start"]

WORKDIR /Frontend
COPY . .
# COPY --from=build-stage . /usr/share/nginx/html
# RUN npm install
RUN npm run build
# RUN mkdir ./build
COPY ./build ./build
# CMD ["nginx", "-g", "daemon off;"]

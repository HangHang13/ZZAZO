FROM node:16.16.0 as build-stage

EXPOSE 3000
WORKDIR /Frontend
COPY . .
RUN npm install
RUN npm run build


# CMD ["nginx", "-g", "daemon off;"]


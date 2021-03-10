FROM node:latest as build-node

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest as prod-nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-node /usr/src/app/dist/flexible-ehr /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]



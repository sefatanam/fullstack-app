FROM docker.io/node:lts-alpine as node
RUN apk add g++ make py3-pip
WORKDIR /app
RUN npm install -g npm@9.6.7
COPY ["package.json", "package-lock.json","./"]
RUN npm install 
RUN npm i -g @nrwl/cli vite pm2@latest
COPY ["nx.json", "./"]
COPY . .

RUN npx prisma generate
RUN npx nx run backend:build:production
RUN npx nx run frontend:build:production
EXPOSE 3000 5173
CMD ["npm","run","app"]


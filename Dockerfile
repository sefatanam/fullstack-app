FROM docker.io/node:lts-alpine
ENV NODE_ENV=production
ENV BACKEND_PORT=3000
ENV FRONTEND_PORT=4200

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "nx.json","./"]

RUN npm install --production --silent && mv node_modules ../
COPY . .
CMD ["npm","start"]
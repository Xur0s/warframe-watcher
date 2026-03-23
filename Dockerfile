FROM node:22.17.0

WORKDIR /app

COPY package*.json ./
COPY yarn.lock* ./

RUN npm install

COPY . .

EXPOSE 8081 19000 19001 19002

CMD ["sleep", "infinity"]
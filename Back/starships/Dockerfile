FROM node:18

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm && \
    npm install -D typescript && \
    pnpm install

COPY . .

EXPOSE 8004

CMD [ "pnpm", "start" ]
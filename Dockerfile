FROM node:16
WORKDIR /usr/app

COPY package.json .
RUN npm install
COPY tsconfig.json .
COPY webpack.config.js .
COPY src src

CMD ["yarn", "package:mac"]

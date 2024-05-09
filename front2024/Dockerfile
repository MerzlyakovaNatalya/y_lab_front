FROM node:20-alpine
WORKDIR /front2024/
COPY src/ /front2024/src
COPY package.json /front2024/
RUN npm install
CMD ["npm", "start"]
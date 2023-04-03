#backend nodejs setup
FROM node:16.13
WORKDIR /node-backend-app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "start"]



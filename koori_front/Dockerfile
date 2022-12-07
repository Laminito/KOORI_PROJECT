FROM node:16-alpine
RUN mkdir kooriFront
COPY . ./kooriFront
WORKDIR /kooriFront/.
RUN npm install
EXPOSE 4200
CMD [ "npm", "start"]

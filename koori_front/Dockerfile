FROM node:18.14.0
RUN mkdir kooriFront
COPY . ./kooriFront
WORKDIR /kooriFront/.
RUN npm install
EXPOSE 4200
CMD [ "npm", "start"]

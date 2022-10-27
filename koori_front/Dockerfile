FROM node:16
RUN mkdir kooriFront
COPY . ./kooriFront
WORKDIR /kooriFront/.
RUN npm install --legacy-peer-deps
EXPOSE 4200
CMD [ "npm", "start"]

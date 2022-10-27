FROM node:16
RUN mkdir kooriBackend
COPY . ./kooriBackend
WORKDIR /kooriBackend/.
RUN npm i --legacy-peer-deps
EXPOSE 3000
CMD [ "npm", "start"]
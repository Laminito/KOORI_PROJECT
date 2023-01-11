FROM node:18.12.1
RUN mkdir kooriBackend
COPY . ./kooriBackend
WORKDIR /kooriBackend/.
RUN npm install
EXPOSE 3001
CMD [ "npm", "start"]
FROM node
RUN mkdir kooriBackend
COPY . ./kooriBackend
WORKDIR /kooriBackend/.
RUN npm install
EXPOSE 3001
CMD [ "npm", "start"]
FROM node:slim 
WORKDIR /app 
COPY . /app 
RUN npm install 
EXPOSE 8999
CMD node Server.js
FROM node:10.16.0-alpine
WORKDIR  /usr/share/arqsoft/api
COPY /package.json /usr/share/arqsoft/api
RUN npm install
COPY /.babelrc /usr/share/arqsoft/api
COPY /.env /usr/share/arqsoft/api
COPY /src /usr/share/arqsoft/api/src
CMD ["npm","run","production"]
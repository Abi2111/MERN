#Select the base image 
FROM node:alpine
#working DIR
WORKDIR /usr/src/app
#copy dependencies & . represents workingDir
COPY package*.json .
#installing the dependencies and dev-dep continoues integration
RUN npm ci
#Coping all files to working dir
COPY . .
#Start run app
npm 
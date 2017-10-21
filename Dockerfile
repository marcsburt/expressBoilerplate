# take default image of node boron i.e  node 8.x
FROM mhart/alpine-node:latest

MAINTAINER Marc Burt <marcburt@bu.edu>

# create working directory
RUN mkdir -p /app

# set /app directory as default working directory
WORKDIR /app

# add package.json to app and install npm
ADD package.json /app
RUN npm install

# copy all file from current dir to /app in container
COPY . /app

# Expose ports [HOST:CONTAINER}
EXPOSE 3000

# cmd to start nodemon service from package.json
ENTRYPOINT ["npm", "start", "-s"]

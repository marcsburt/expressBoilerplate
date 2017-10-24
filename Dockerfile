# take default image of node boron i.e  node 6.x
FROM node:8.4.0

MAINTAINER marcburt

# create app directory in container
RUN mkdir -p /app

# set /app directory as default working directory
WORKDIR /app

# only copy package.json initially so that `RUN npm` layer is recreated only
# if there are changes in package.json
ADD package.json /app/

# --install dependencies
RUN npm install

# copy all file from current dir to /app in container
COPY . /app/

# expose port 4040
EXPOSE 3000

# cmd to start service
CMD [ "npm", "start", "-s" ]

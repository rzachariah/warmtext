FROM node:carbon
WORKDIR /api
COPY package.json yarn.lock /api/
RUN yarn
COPY . /api
ENV PORT 80
EXPOSE 80
CMD yarn start
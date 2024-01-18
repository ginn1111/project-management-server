FROM node:18-alpine AS base
# set up for pnpm package manager

# COPY package.json yarn.lock ./

COPY . .
RUN yarn --frozen-lockfile

RUN  yarn build

EXPOSE 8080

CMD [ "node", "./dist/main.js" ]



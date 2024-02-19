ARG NODE_ENV_BUILD development
FROM node:18-alpine AS base
WORKDIR /server

COPY package.json yarn.lock ./
COPY ./prisma/ ./prisma/

FROM base as dev
COPY . .
RUN yarn --frozen-lockfile

CMD ["yarn", "dev"]

FROM dev as builder
ENV NODE_ENV={$NODE_ENV_BUILD}
RUN yarn build

FROM base as prod
ENV NODE_ENV={$NODE_ENV_BUILD}
COPY --from=dev /server/node_modules ./node_modules
COPY --from=builder /server ./

EXPOSE 8080

CMD [ "node", "./dist/main.js" ]



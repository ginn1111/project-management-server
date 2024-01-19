FROM node:18-alpine AS base
WORKDIR /server

COPY package.json yarn.lock ./
COPY ./prisma/ ./prisma/

FROM base as dev
COPY . .
RUN yarn --frozen-lockfile

CMD ["yarn", "dev"]

FROM dev as builder
RUN  yarn build

FROM base as prod
COPY --from=dev /server/node_modules ./node_modules
COPY --from=builder /server/dist ./

EXPOSE 8080

CMD [ "node", "main.js" ]



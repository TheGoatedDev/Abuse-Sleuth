FROM node:16-alpine AS base
RUN apk update


FROM base AS builder
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@abuse-sleuth/web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

FROM base AS sourcer
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN yarn turbo run build --scope=@abuse-sleuth/web --include-dependencies --no-deps

EXPOSE 3000

ENTRYPOINT [ "yarn", "start" ]

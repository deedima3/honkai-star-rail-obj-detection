FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm install -g pnpm
RUN pnpm install
COPY . .

ARG PUBLIC_API_ENDPOINT
ARG HOST
ARG PORT

RUN pnpm run build
RUN pnpm prune --prod

FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "build"]
# Deps

FROM --platform=linux/amd64 node:20.17-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Yes yes, always use npm ci and in production…
COPY package.json ./
RUN npm i
RUN npm i @node-rs/argon2-linux-x64-musl

# Build

FROM --platform=linux/amd64 node:20.17-alpine AS builder
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLIENTVAR
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN SKIP_ENV_VALIDATION=1 npm run build

RUN npm run db:push

# Run

FROM --platform=linux/amd64 gcr.io/distroless/nodejs20-debian12 AS runner
WORKDIR /app

ENV NODE_ENV production

# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["server.js"]
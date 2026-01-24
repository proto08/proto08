FROM oven/bun:1 AS deps

WORKDIR /app
COPY ./frontend/package.json ./frontend/bun.lock /app/frontend/
WORKDIR /app/frontend
RUN bun install --frozen-lockfile

FROM oven/bun:1 AS build

WORKDIR /app
COPY --from=deps /app/frontend/node_modules /app/frontend/node_modules
COPY ./frontend /app/frontend
WORKDIR /app/frontend
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

FROM oven/bun:1 AS runner

WORKDIR /app/frontend
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=build /app/frontend/.next /app/frontend/.next
COPY --from=build /app/frontend/public /app/frontend/public
COPY --from=build /app/frontend/package.json /app/frontend/package.json
COPY --from=build /app/frontend/next.config.ts /app/frontend/next.config.ts
COPY --from=build /app/frontend/node_modules /app/frontend/node_modules

EXPOSE 3000
CMD ["bun", "run", "start", "--", "-H", "0.0.0.0", "-p", "3000"]

FROM oven/bun:1 AS deps

WORKDIR /app
COPY ./package.json ./bun.lock /app/
RUN bun install --frozen-lockfile

FROM oven/bun:1 AS build

WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY . /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

FROM oven/bun:1 AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/next.config.ts /app/next.config.ts
COPY --from=build /app/node_modules /app/node_modules

# Create non-root user
RUN groupadd -r nodejs && useradd -r -g nodejs nodejs
RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000
CMD ["bun", "run", "start", "--", "-H", "0.0.0.0", "-p", "3000"]

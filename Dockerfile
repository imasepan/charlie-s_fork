# Use the official Bun image for the backend
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Install dependencies into temp directory (backend)
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install with --production (exclude devDependencies) (backend)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Copy node_modules from temp directory, then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . . 

# [optional] tests & build (backend)
ENV NODE_ENV=production
RUN bun test

# Copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/src/run.ts ./src/run.ts 
COPY --from=prerelease /usr/src/app/package.json . 

# Run the backend app
USER bun
EXPOSE 9999/tcp
ENTRYPOINT [ "bun", "run", "src/run.ts" ] 

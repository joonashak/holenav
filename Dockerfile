# Production image.
FROM node:20.13.1 as build

# Build backend.
WORKDIR /server
COPY server .
RUN npm ci
RUN npm run build
RUN npm prune --production

# Build frontend.
WORKDIR /web
COPY web .
RUN npm ci
ARG VITE_BACKEND_URL=""
RUN npm run build


# Final stage with only necessary files.
FROM node:20.13.1-alpine

USER node

WORKDIR /app
COPY --from=build /server/dist dist
COPY --from=build /server/node_modules node_modules
COPY --from=build /web/dist dist/public

CMD ["node", "/app/dist/src/main.js"]

FROM node:lts-slim
WORKDIR /app
COPY derdiedas .
RUN npm i -g pnpm && pnpm install && pnpm run build-dev
EXPOSE 4200
CMD pnpm run ng serve --no-live-reload --host 0.0.0.0 --disable-host-check

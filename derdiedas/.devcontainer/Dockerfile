FROM mcr.microsoft.com/devcontainers/javascript-node
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends bundler python3 python-is-python3 \
    && npm install -g pnpm
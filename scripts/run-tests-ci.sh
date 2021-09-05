#!/bin/bash

# Run server linter in dev container, because dev deps are pruned from production container.
touch .env.development
docker-compose build server || exit 1
docker-compose run --no-deps server npm run lint || exit 1

# Build and lint client.
docker-compose -f docker-compose-ci.yml build client-ci || exit 1
docker-compose -f docker-compose-ci.yml run client-ci npm run lint || exit 1

# Start services.
docker-compose -f docker-compose-ci.yml build server-ci || exit 1
docker-compose -f docker-compose-ci.yml up -d db-ci server-ci client-ci || exit 1

# Run linter for test code and E2E tests.
docker-compose -f docker-compose-ci.yml build e2e-ci || exit 1
docker-compose -f docker-compose-ci.yml run e2e-ci npm run lint || exit 1
docker-compose -f docker-compose-ci.yml run e2e-ci || exit 1

# This is not strictly necessary in CI, but helps when debugging things locally, etc.
docker-compose -f docker-compose-ci.yml down

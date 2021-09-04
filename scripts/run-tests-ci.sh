#!/bin/bash

docker-compose -f docker-compose-ci.yml build server-ci client-ci e2e-ci
docker-compose -f docker-compose-ci.yml up -d db-ci server-ci client-ci

# Linting
docker-compose -f docker-compose-ci.yml exec -T server-ci npm run lint || exit 1
docker-compose -f docker-compose-ci.yml exec -T client-ci npm run lint || exit 1
docker-compose -f docker-compose-ci.yml run e2e-ci npm run lint || exit 1

# E2E
docker-compose -f docker-compose-ci.yml run e2e-ci || exit 1

# This is not strictly necessary in CI, but helps when debugging things locally, etc.
docker-compose -f docker-compose-ci.yml down

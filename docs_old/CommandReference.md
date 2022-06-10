# Command Reference

These commands control the development environment. Run them in the project root.

## Installation

Install NPM packages locally in all sub-projects.

Not strictly required as the containerized environment will function without installing the dependencies locally. However, for actual development this is necessary in order to use tools such as linting, have TypeScript resolve dependencies correctly, etc.

```bash
npm run setup
```

## Basic Commands

Control the containerized development environment. Requires `npm`, `docker` and `docker-compose` commands to be available on the host machine.

### Start In Development Mode

Starts the development and test containers in detached mode and shows backend and frontend logs.

```bash
npm start
```

### Start In Development Mode (Detached)

```bash
npm run startd
```

### Stop

```bash
npm stop
```

### Attach To Logs

App must be running.

```bash
npm run logs
```

## Linting

Linting runs on the host machine, thus [NPM packages must be installed](#installation). Containers do not need to be up.

### Run linter

Lints all sub-projects when run in repository root. Can also be run in sub-project folders `client`, `e2e` and `server`.

```bash
npm run lint
```

## Backend Unit Tests

These tests run on the host machine and require [NPM packages to be installed](#installation). Containers do not need to be up.

Execute in `server/` directory.

Both commands can be appended with `-- PATTERN` to run only test files that match `PATTERN`, e.g., `npm run test:watch -- auth`.

### Run Backend Unit Tests

```bash
npm test
```

### Watch Backend Unit Tests

```bash
npm run test:watch
```

## Containerized Tests

Development environment containers must be running before using these testing commands.

### Run All Tests

```bash
npm test
```

### Run Only End-to-End Tests (Cypress)

```bash
npm run test:e2e
```

### Open Cypress GUI

```bash
npm run test:open
```

## Database Management

### Drop Database

Removes Mongo's Docker volume. Stop the app before running this.

```bash
npm run db:drop
```

## Code Generation

### Generate GraphQL Operations

Uses `graphql-codegen` to generate TypeScript GraphQL operations from `.graphql` documents in frontend. Backend must be running as schema is taken from the GraphQL endpoint.

Run this command in the `client/` directory.

```bash
npm run generate
```

## Documentation

### Run Documentation Dev Server

Docs will be available at [http://localhost:8080](http://localhost:8080) when this command is running.

```bash
npm run docs
```

# Command Reference

These commands control the development environment. Run them in the project root.

## Installation

### Install NPM Packages

Install NPM packages in all sub-projects on the local machine.

```bash
npm run setup
```

:::tip
Installing NPM packages locally is not always required as the containerized environment will function without. However, for actual development work it is necessary in order to use tools such as linting, have TypeScript resolve dependencies correctly, etc.
:::


## Basic Commands

Control the containerized development environment. Requires `npm`, `docker` and `docker-compose` commands to be available on the host machine.

### Start in Development Mode

Starts the development and test containers in detached mode and displays the backend and frontend logs.

```bash
npm start
```

### Start in Development Mode (Detached)

```bash
npm run startd
```

### Stop

```bash
npm stop
```

### Attach to Logs

App must be running.

```bash
npm run logs
```

## Linting

:::tip
Linting runs on the host machine, thus [NPM packages must be installed](#installation). Containers do not need to be up.
:::

### Run Linter

Lints all sub-projects when run in repository root. Can also be run in sub-project folders `client`, `e2e` and `server`.

```bash
npm run lint
```

## Backend Unit Tests

:::tip
These tests run on the host machine and require [NPM packages to be installed](#installation). Containers do not need to be up.
:::

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

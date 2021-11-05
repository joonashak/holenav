# Command Reference

These commands control the development environment. Run them in the project root.

## Basic Commands

### Start In Development Mode

```bash
npm start
```

Starts the development and test containers in detached mode and shows backend and frontend logs.

### Start In Development Mode (Detached)

```bash
npm run startd
```

### Stop

```bash
npm stop
```

### Attach To Logs

App must already be running.

```bash
npm run logs
```

## Testing

Development environment must be running before using testing commands.

### Run All Tests

```bash
npm test
```

### Run Only Linting

```bash
npm run lint
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

The database container (`holenav-db`) must be running before using these commands.

### Dump Database

```bash
npm run db:dump
```

### Drop Database

```bash
npm run db:drop
```

### Seed Database

```bash
npm run db:seed
```

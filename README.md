# holenav

New mapper for make benefit of the glorious EVE community. Currently in early prototyping.

## Development Environment

Docker Compose configuration is provided for containerized development. You need to have Docker, Docker Compose and NPM installed. The development environment is controlled with NPM scripts defined in `./package.json`.

## Getting Started

Database is not automatically seeded at this time. Start with `npm run db:seed` and follow with `npm run start:logs` to verify that everything is working.

### Basic Commands

#### Start In Development Mode (Detached)

```bash
npm start
```

#### Start In Development Mode (With Logs)

```bash
npm run start:logs
```

#### Stop

```bash
npm stop
```

#### Attach To Logs

App must be already running.

```bash
npm run logs
```

### Database Management

The database container (`holenav-db`) must be running before using these commands.

#### Dump Database

```bash
npm run db:dump
```

#### Drop Database

```bash
npm run db:drop
```

#### Seed Database

```bash
npm run db:seed
```

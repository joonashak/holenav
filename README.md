# holenav

New mapper for make benefit of the glorious EVE community. Currently in early prototyping.

## Development Environment

Docker Compose configuration is provided for containerized development. You need to have Docker, Docker Compose and NPM installed. The development environment is controlled with NPM scripts defined in `./package.json`.

### Commands

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

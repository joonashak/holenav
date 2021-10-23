# Holenav

Modern open-source mapper for EVE Online's wormhole community. Currently in early development and not production ready. Follow the [Stable Release milestone](https://github.com/joonashak/holenav/milestone/1) to see where we are currently at.

## Documentation

- [Command Reference](./docs/CommandReference.md)
- [Configuration](./docs/Configuration.md)
- [Database](./docs/Database.md)

## Development Environment

Docker Compose configuration is provided for containerized development. You need to have Docker, Docker Compose and NPM installed. The development environment is controlled with NPM scripts defined in `./package.json`.

### Getting Started

The development environment can be used without any configuration. If you want to use EVE SSO in development, see [Configuration](./docs/Configuration.md).

#### Install NPM Packages

This is not required if you only want to test the app. For developing and running tests, install the NPM packages:

```bash
npm run setup
```

#### Launch Development Environment

```bash
npm start
```

### More Commands

For all commands, see [Command Reference](./docs/CommandReference.md).

## Deployment

Preliminary Kubernetes configurations are provided in `.manifests/` along with a [README](.manifests/README.md). The frontend can be hosted on any static website host by building the CRA project located in the `client/` folder.

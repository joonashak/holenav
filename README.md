# Holenav

Modern open-source mapper for EVE Online's wormhole community. Currently in
early development and not production ready. Follow the
[Stable Release milestone](https://github.com/joonashak/holenav/milestone/1) to
see where we are currently at.

## Documentation

- [Command Reference](./docs/CommandReference.md)
- [Configuration](./docs/Configuration.md)
- [Database](./docs/Database.md)
- [Roles](./docs/Roles.md)

## Development Environment

Docker Compose configuration is provided for containerized development. You need
to have Docker, Docker Compose and NPM installed. The development environment is
controlled with NPM scripts defined in `./package.json`.

### Getting Started

The development environment can be used without any configuration. If you want
to use EVE SSO in development, see [Configuration](./docs/Configuration.md).

However, you may need to **increase Docker's memory allowance** (Preferences >
Resources). Your mileage may wary but at least on macOS the default setting of 2
GB is not enough to run the duplicate containers used for the tests. I have not
tried to find the minimum usable memory amount but 8 GB works for sure and 4 GB
is probably enough.

#### Install NPM Packages

This is not required if you only want to test the app. For developing and
running tests, install the NPM packages:

```bash
npm run install:all
```

#### Launch Development Environment

```bash
npm start
```

### More Commands

For all commands, see [Command Reference](./docs/CommandReference.md).

## Deployment

Preliminary Kubernetes configurations are provided in `.manifests/` along with a
[README](.manifests/README.md). The frontend can be hosted on any static website
host by building the CRA project located in the `client/` folder.

Thorough deployment manual will be provided once there's a point in deploying
this software ;)

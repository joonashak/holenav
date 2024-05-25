# Guide: Continuous Deployment Using VPS and CDN (Preferred Method) [DRAFT]

This guide details how to host Holenav with automatic updates using a virtual
private server (VPS), an external MongoDB service and a content delivery network
(CDN).

:::tip This is the "official" deployment and upgrade method in the sense that it
is what I am using for running the staging environment. Keeping this deployment
path stable is a priority in development, and in that sense implementing a
similar pipeline is probably the easiest way to host Holenav. :::

:::warning Using continuous deployment, i.e., updating Holenav automatically,
leaves you vulnerable to the risk of a malicious release being published.
Essentially you will be leaving your in-game operational security up to the
Holenav author(s). Should you choose to vet releases and update by hand, you can
simply leave out the [last part](#update-backend-automatically) of this guide.
:::

## Required Services

Required services to host Holenav as per this guide:

- VPS (Virtual Private Server) instance with Docker runner for hosting the
  backend.
- MongoDB SaaS access for providing a database to the backend.
- CDN (Content Delivery Network) access to deploy the frontend.
  ([Vercel](https://vercel.com/), if you want to use the exact same GitHub
  action as in this guide.)
- GitHub account.
- Domain.
- EVE Online SSO.

Most of these services can be used for free for moderate amounts of traffic – a
proper VPS service might be hard to find for free.

:::tip A custom domain is not strictly required, however this guide assumes you
have one. At a bare minimum, you must have a static domain for both the backend
and the frontend. (If using an IP address, you will face a terrible certificate
battle to enable SSL, and without SSL, virtually no browser will connect to the
backend.) :::

:::danger This guide uses GitHub and Vercel tokens to deploy the frontend.
_**When managing your Holenav instance in a team, you should create dedicated
user accounts for GitHub and Vercel.**_ This is necessary because anyone who has
access to your VPS will be able to read your GitHub token which enables full
control of your repos. By extension, they would be able to control your Vercel
account as well. :::

### Service Providers

Service providers used when writing this guide:

- VPS: [Hetzner Cloud](https://www.hetzner.com/cloud) CX11
- Database: [MongoDB Atlas](https://www.mongodb.com/atlas/database) M0 Sandbox
- CDN: [Vercel](https://vercel.com/) Hobby
- [GitHub](https://github.com/)

Note that these are provided for reference and to make cloning my setup easier.
I do not receive any compensation for mentioning the companies.

## Setup Domain Records

This guide uses `holenav.com` as an example domain. Replace it with your own.
Create the host records in the following table using your DNS provider.

| Record Type | Host  | Value                     | TTL       |
| ----------- | ----- | ------------------------- | --------- |
| A           | `api` | _Your backend IP address_ | Automatic |
| CNAME       | `@`   | `cname.vercel-dns.com`    | Automatic |

With this DNS setup, backend URL would be `api.holenav.com` and frontend URL
just `holenav.com`. If you are not using Vercel, find out from your CDN provider
what kind of a DNS record you need to make.

## Register for SSO

TBA.

## Configure Frontend Deployment

The frontend is implemented as a React app that is served to users via CDN. In
this setup, frontend deployment is triggered by the backend after it has been
successfully updated. The backend makes a request to a GitHub webhook
dispatching a workflow that deploys the frontend.

### Create Vercel Project

Create a new project in Vercel dashboard. In _Project Settings_, add an
environment variable named `REACT_APP_BACKEND_URL` and set its value to your
backend URL (e.g. `https://api.holenav.com`).

Next, go to _Personal Account Settings_ and create a new token. It will be used
to deploying the frontend from GitHub.

### Create GitHub Workflow to Deploy Frontend

TBA.

## Serve Backend on VPS

The backend is hosted on a standard Ubuntu VPS instance using Docker and the
`holenav-server` image provided through GitHub Container Registry (GHCR).
Additionally, Caddy is set up as a proxy server to provide automatic SSL
certificate management.

MongoDB is required when setting up the backend, so make sure to set that up
before continuing. If you are using MongoDB Atlas, the free service tier is of
type _Shared Cluster_ and _M0 Sandbox_.

To setup the backend, you need to create four configuration files:

- `compose.yaml`
- `server.production.env`
- `neo.production.env`
- `Caddyfile`

### Configure Holenav Server

Create a new file called `compose.yaml`. Use `/holenav` as the directory or make
sure to update the configuration if you used another location.

#### `compose.yaml`

```yaml
services:
  server:
    image: ghcr.io/joonashak/holenav-server:latest
    ports:
      - "3001:3001"
    container_name: holenav-server
    env_file:
      - server.production.env
    restart: unless-stopped
    logging:
      driver: "local"

  neo:
    image: neo4j:4.4
    restart: unless-stopped
    container_name: holenav-neo
    env_file:
      - neo.production.env
    volumes:
      - type: volume
        source: neo-data
        target: /data
    ports:
      - 7687:7687
    logging:
      driver: "local"

  proxy:
    image: caddy:2
    container_name: holenav-caddy
    ports:
      - "443:443"
      - "80:80"
    volumes:
      - /holenav/caddy/data:/data
      - /holenav/caddy/config:/config
      - /holenav/caddy/Caddyfile:/etc/caddy/Caddyfile
      - /usr/local/share/ca-certificates:/data/caddy/pki/authorities/local
    restart: unless-stopped
    logging:
      driver: "local"

volumes:
  neo-data:
```

Then create files `server.production.env` and `neo.production.env` in the same
location. Use the following environment variables to populate it and replace the
values with your own.

#### `server.production.env`

```bash
NODE_ENV=production
PORT=3001
MONGO_URL=
CLIENT_URL=https://holenav.com
SSO_CALLBACK_URL=https://api.holenav.com/auth/callback
SSO_CLIENT_ID=
SSO_SECRET_KEY=
JWT_SECRET=
CLIENT_CD_TOKEN=
CLIENT_CD_OWNER=
CLIENT_CD_REPO=
CLIENT_CD_WORKFLOW_ID=deploy_client.yaml
NEO_URL=neo4j://neo
NEO_DB=neo4j
NEO_USERNAME=neo4j
NEO_PASSWORD=yourSuperSecretNeoPassword
```

#### `neo.production.env`

```bash
NEO4J_AUTH=neo4j/yourSuperSecretNeoPassword
```

### Configure Caddy

Caddy will act as a proxy server between the `server` service and the internet,
providing automatic SSL certificates. This enables HTTPS, without which
virtually all modern browsers will refuse to make requests to the backend.

:::tip If you are using another way to enable HTTPS (commonly offered by VPS
providers), you can skip this step. Just make sure to also remove the `proxy`
service defined in `compose.yaml`. :::

Create a new file called `Caddyfile` at `/holenav/caddy`. Insert the following
configuration into the file, replacing `holenav.com` with your own domain.

#### `Caddyfile`

```
{
}

https://api.holenav.com {
  reverse_proxy server:3001
}
```

:::tip Docker Compose services can be accessed with the service names from
within their own network. This is why Caddy can reach the backend simply at
`server:3001`. :::

## Update Backend Automatically

TBA.

### Choose Version Tag to Limit Update Scope

TBA.

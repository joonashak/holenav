# Kubernetes Configuration

> **Note:** This configuration is preliminary and not suitable for production use!

Manifests to easily host Holenav backend using Kubernetes. Does not include the database (I'm using Mongo Atlas DaaS).

## Requirements

- `k3d` version `4.4.7` or higher.
- `kubernetes-cli`
- MongoDB instance accessible to your Kubernetes host.
- `.env` file(s) containing the required environment variable values (see below).

### Environment Variables

Each environment requires its own configuration file named `.env` to be readable in the manifest folder (i.e., `.manifests/production` or `.manifests/staging`). The file should have one variable per line as _key_=_value_ pairs.

The required variables:

|Key|Description|
|-|-|
|`DATABASE_URL`|Fully qualified MongoDB connection string.|
|`CLIENT_URL`|Frontend address used for configuring CORS.|

## Usage Example

Run these commands on your Kubernetes host to setup and run Holenav backend.

### Create Cluster

```bash
k3d cluster create -p 8081:80@loadbalancer
```

The first port (8081) specifies where the backend will be accessible.

### Create Namespace

```bash
kubectl create namespace holenav
```

Use `holenav` for production and `holenav-staging` for staging.

### Set Default Namespace

```bash
k config set-context --current --namespace=main
```

Optional but makes debugging etc. easier.

### Run

```bash
k apply -k .manifests/staging/
```

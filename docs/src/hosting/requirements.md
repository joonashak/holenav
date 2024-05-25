# Technical Requirements

Holenav is intended to be hosted using a combination of a Docker runner to serve
the backend and a CDN to distribute the static frontend.

As the source code is open, you can even build from source and go from there, if
you wish. However, be warned that this documentation probably falls short of
being a complete guide for that path.

## Typical Requirements

- Hosting service that is able to run Docker images and serve connections over
  HTTPS.
- MongoDB database.
- Neo4j database.
- CDN to serve the frontend to users.

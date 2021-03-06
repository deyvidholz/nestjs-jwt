## Description

NestJS JWT API boilerplate.

# Installation

## Prerequisites

- [`Node`](https://nodejs.org/en/download) >= 12.18.0
- Globally [`yarn`](https://yarnpkg.com/cli/install)
- [`Docker`](https://docs.docker.com/get-docker)

Install yarn packages before continue

```bash
$ yarn
```

Ask other developers to share `.development.env`. For security reasons this file is not versioned.

## Setting up PostgreSQL database

- This is will make a new PostgreSQL running in the standard port `5432`
- Please shutdown any previous conflicting PostgreSQL instances before starting
  this

```bash
$ docker-compose up
```

Check the database is up

```bash
$ docker logs -f postgres
```

Go to http://localhost:5433 to access pgadmin UI.

## Running the app

```bash
$ yarn start:dev
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Documentation

The documentation offers two options: **Swagger** to inspect the API endpoints and **Compodoc** to inspect the application components.

### Swagger

After start the app, access `/swagger` route in order to use the playground which allows manually tests in the API routes.
It will also provide all the models and routes available in the application.

### Compodoc

To generate the project documentation use `yarn doc`, it will generate the documentation usually on http://localhost:8080, it
contains the core of all the application components.

## TODO

- [ ] Add logger
- [ ] Check if environment variables are loading correctly
- [ ] Add migrations
- [ ] Add healthcheck to get database status
- [ ] Make this app production ready

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

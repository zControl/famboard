## FamBoard - Backend

## Description

A backend REST API that provides CRUD operations on a postgres database.

## Tech Stack

[NestJS](https://github.com/nestjs/nest) REST Api

## Install, complile, run

```bash
$ npm install
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database Migrations

### Whenever entities changes, generate a migration

```sh
npm run typeorm migration:generate -- -d ormconfig.ts -n InitialMigration
```

This will create a migration file in `/src/migrations`

### Apply migrations locally

```sh
npm run typeorm migration:run -- -d ormconfig.ts
```

### Run production migrations as part of CI/CD workflow.

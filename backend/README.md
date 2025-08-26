## FamBoard - Backend
A backend REST API that provides CRUD operations on a postgres database.

## Stack

- [NestJS](https://github.com/nestjs/nest) - REST API
- [TypeORM](https://github.com/typeorm/typeorm) - Relational Mapping
- [Postgres](https://github.com/postgres/postgres) - Database

## Commands

### Testing

```bash
# unit tests
$ npm run test
```
```bash
# e2e tests
$ npm run test:e2e
```
```bash
# test coverage
$ npm run test:cov
```

### Local Development

```bash
# install dependencies
$ npm install
```
```bash
# development
$ npm run start
```
```bash
# watch mode
$ npm run start:dev
```

### Build
```bash
# build application
npm run build
```

### Database Migrations
```bash
# generate a migration
npm run typeorm migration:generate src/database/migrations/MigrationNameHere
```
```bash
# run the migration
npm run typeorm migration:run
```
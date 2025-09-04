## FamBoard - Backend

A backend REST API that provides CRUD operations on a postgres database.

## Stack

- [NestJS](https://github.com/nestjs/nest) - REST API
- [TypeORM](https://github.com/typeorm/typeorm) - Relational Mapping
- [Postgres](https://github.com/postgres/postgres) - Database

### Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov

# test database connection
npm run test:db
```

### Local Development

```bash

# watch mode
npm run start:dev
```

### Build

```bash

# install dependencies
npm ci

# build application
npm run build

# run migration
npm run typeorm migration:run
```

### Deploy

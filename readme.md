
# Find your duo API

Clean REST API using NodeJs, Prisma and Express.


## Run Locally

Clone the project

```bash
  git clone https://github.com/ebertmota/find-your-duo-api.git
```

Go to the project directory

```bash
  cd find-your-duo-api
```

Install dependencies

```bash
  yarn
```

Create .env file providing these variables
```text
  APP_PORT=

  POSTGRESQL_HOST=
  POSTGRESQL_PASSWORD=
  POSTGRESQL_DATABASE=
  POSTGRESQL_PORT=
  POSTGRESQL_USERNAME=
```

Run database migrations
```bash
  yarn db:migrate:dev
```

Run database seed
```bash
  yarn db:seed
```

Start the server

```bash
  yarn dev
```


## Running Tests

To run tests, run the following command

```bash
  yarn test
```


# Quicklance

## Project Documentation Placeholder

### Documentation placeholder

## Local Development

### Prerequisites

- Docker
- Maven
- Java 21

### Setting up the Database

The application requires a PostgreSQL database to be running. Start a PostgreSQL database using Docker by running the following command:

```shell
docker run --rm --name quicklance-db -e POSTGRES_USER=quicklance -e POSTGRES_PASSWORD=quicklance -p 5432:5432 -d postgres
```

The application will connect to this database automatically using the configuration in `application.properties`
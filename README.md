# Quicklance

## Project Documentation Placeholder

### Documentation placeholder

## Local Development

### Prerequisites

- Docker
- Maven
- Java 21

### Running the Backend Using Docker
1. Navigate to the backend folder
    ```shell
    cd backend
    ```    
2. Ensure environment variables are set in `docker-compose.yml`
3. Build and run the containers
    ```shell
    docker-compose up --build
    ```
This command will:
- Build the `quicklance-backend` image using the `Dockerfile` in the backend folder
- Start the `quicklance-db` container (PostgreSQL) and the `quicklance-backend` container
- The backend will be accessible at `http://localhost:8080`

### Setting up the Database

The application requires a PostgreSQL database to be running. Start a PostgreSQL database using Docker by running the following command:

```shell
docker run --rm --name quicklance-db -e POSTGRES_USER=quicklance -e POSTGRES_PASSWORD=quicklance -p 5432:5432 -d postgres
```

The application will connect to this database automatically using the configuration in `application.properties`
After that, to run the backend, execute the following command:

```shell
mvn spring-boot:run
```
# Bookify

Bookify is a web application that provides personalized book recommendations to help you find your next favorite read.

## Accessing the Live Project

If you don't want to run the project locally, you can access the live version at [http://85.215.172.159/#/](http://85.215.172.159/#/).

Otherwise, you can follow the instructions below to run the project on your machine.

## Prerequisites

- Docker
- Docker Compose

## Installation

1. Clone the repository:

```sh
git clone git@github.com:EwenSellitto/Bookify.git
cd bookify
```

1. Look up the .env file in the server directory and replace the values with your own if needed (for example, if the port 5432 is already in use on your machine). The default values are:

```sh
POSTGRES_USER=bookify
POSTGRES_PASSWORD=vwlUd9cmw$mAj
POSTGRES_DB=bookify_db
POSTGRES_HOST=database
POSTGRES_PORT=5432

DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"

TEST_USER_PASSWORD="0Y}KcVBrlLhR;"

JWT_SECRET="u_ba(s5FH_QuLGcNgzG1@E"
```

3. Look up the .env file in the client directory and replace the value with your own if needed (for example, if the port 5000 is already in use on your machine). The default value is:

```sh
REACT_APP_API_URL=http://localhost:5000/
```

## Running the Project

1. Start the Docker containers:

```sh
docker-compose up --build
```

2. The frontend will be accessible at http://localhost:3000 and the backend at http://localhost:5000.

3. After you're done, you can stop the containers with:

```sh
docker-compose down
```

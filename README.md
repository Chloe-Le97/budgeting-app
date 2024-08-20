# Budgeting App

Budgeting App is a web application that helps users manage their personal finances. It allows users to track their income and expenses, set financial goals, and visualize their savings progress. With its user-friendly interface and powerful features, Budgeting App makes personal finance management efficient and easy.

## Technologies Used

- **Frontend:** React.js - A JavaScript library for building user interfaces.
- **Backend:** Node.js - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Web Framework:** Express.js - A web application framework for Node.js.
- **Database:** PostgreSQL - An open-source object-relational database system.

## Running the Database with Docker

This application uses PostgreSQL for its database. You can easily run a local instance of PostgreSQL using Docker and Docker Compose.

Follow these steps to get the database up and running:

1. Ensure you have [Docker](https://www.docker.com/products/docker-desktop) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

2. Navigate to the directory containing the `docker-compose.yaml` file.

3. Run the following command to start the PostgreSQL service:

```bash
docker-compose -f docker-compose.yaml up
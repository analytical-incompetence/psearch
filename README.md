# PSearch

The only web browser you will ever need.

## Setup

### Prerequisites

- Install [Docker](https://docs.docker.com/engine/install/)
- Install [NodeJS](https://nodejs.org/en/download)

> [!NOTE]
> You will have to add a .env file at the root of the folder with the following access tokens for it to run.
> If you do not plan on using one of the Auth providers, simply set it to an empty string. If the key is not present
> the server will not run correctly.

- DATABASE_URL="postgresql://postgres:0T3zQSygmDNKlmwH@localhost:5432/psearch"
- NEXTAUTH_SECRET="TestSecret"
- NEXTAUTH_URL="http://localhost:3000"
- DISCORD_CLIENT_ID="example_id"
- DISCORD_CLIENT_SECRET="shhhhhhh"
- GOOGLE_CLIENT_ID="google_id"
- GOOGLE_CLIENT_SECRET="shhhhhhh"
- STRAVA_CLIENT_ID="example_id"
- STRAVA_CLIENT_SECRET="shhhhhh"
- BRAVE_SEARCH_API_SECRET = "shhhhhhh"
- OPENAI_API_SECRET = "shhhhhh"

### 0. Installing Dependencies
Install all the dependencies by running:

```sh 
npm install
```

### 1. Starting Database (Docker Container)

To start the database use the command:

```sh
./start-database.sh
```

### 2. Pushing Schema to the Database

```sh
npm run db:push
```

### 3. Starting the server

```sh
npm run dev
```

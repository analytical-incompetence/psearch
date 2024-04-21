# PSearch

Occasionally, you might find what you're looking for.

## Setup

### Pre-requisites

- Install [Docker](https://docs.docker.com/engine/install/)
- Install [NodeJS](https://nodejs.org/en/download)

> [!NOTE]
> You will have to add a .env file at the root of the folder with the following access tokens for it to run:

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

### 1.Starting Database (Docker Container)

To start the data base use the command:

```sh
./start-database.sh
```

### 2.Pushing Schema to the Database

```sh
npm run db:push
```

### 3.Starting the server

```sh
npm run build
```

Then

```sh
npm run start
```

Or if you would rather run it in development mode you can run the command:

```sh
npm run dev
```

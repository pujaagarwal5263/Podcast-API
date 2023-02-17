# Podcast API
This is a project with 2 databases: `users` and `podcasts`\
There are different APIs to perform CRUD operations on databases.

### Setup Postgres in Docker

- Make sure you have docker installed, and docker-compose is working.
- Run the command

```
docker-compose -f postgres-docker-compose.yaml create
```

```
docker start helloPostgres
```

- You can run the command to directly run the service.

```
npm run dev
```

- Or you can run the JS files by running following commands.

```
npm run build
npm start
```

### DB Seeding

- Random Data has been generated using faker.js
- It creates 100 Random users and 100 random podcasts.

- To seed the DB, run the following command

```
npm run dbseed
```

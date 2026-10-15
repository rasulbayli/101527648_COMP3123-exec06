# COMP3123 Exercise 06: MongoDB Notes API

REST API built with Node.js, Express 5 and Mongoose 8. The API supports creating, listing, retrieving, updating and deleting notes.

## Requirements

- Node.js 18 or newer
- MongoDB Atlas (or a local MongoDB server)

## Run the API

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and set `DB_URL` to your Atlas connection string. For local MongoDB, use `mongodb://127.0.0.1:27017/comp3123_exec06`.
3. Start the server: `npm start`
4. The server listens at `http://localhost:8081` after a successful database connection.

The `.env` file is ignored by Git. Never commit database credentials.

## MongoDB Atlas setup

1. Sign in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.
2. Under **Database Access**, create a database user and save its password.
3. Under **Network Access**, add your current IP address.
4. Choose **Connect** on the cluster, then **Drivers**. Copy the Node.js connection string.
5. Replace the username, password, and cluster host in `.env.example`, then save the file as `.env`. Use `comp3123_exec06` as the database name in the URI. URL-encode reserved characters in the password.
6. Run `npm start`; the terminal should show both the successful database connection and port 8081.

## API endpoints

All note routes use the `/api` prefix. The starter assignment's nested payload shape is supported (`{"content": {...}}`), and a direct note object is also accepted.

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/` | Welcome page |
| POST | `/api/notes` | Create a note (201) |
| GET | `/api/notes` | List notes |
| GET | `/api/notes/:noteId` | Get one note |
| PUT | `/api/notes/:noteId` | Update a note |
| DELETE | `/api/notes/:noteId` | Delete a note |

Example create/update body:

```json
{
  "content": {
    "noteTitle": "Sample Note Title",
    "noteDescription": "Sample Note Description",
    "priority": "HIGH",
    "dateAdded": "06/Oct/2025",
    "dateUpdated": "06/Oct/2025"
  }
}
```

`noteTitle` and `noteDescription` are required. `priority` accepts `HIGH`, `MEDIUM`, or `LOW` and defaults to `MEDIUM`. MongoDB supplies the note ID and timestamps. API responses use JSON; invalid IDs and invalid note data return a 400, and missing notes return a 404.

## Postman

Import `postman/COMP3123-Exercise06.postman_collection.json` into Postman. The requests cover the welcome route and CRUD operations. Create a note first; its response saves the generated ID for the remaining requests. Run the collection against `http://localhost:8081` and capture screenshots of the actual response and status for submission.

## GitHub submission

This project is published at [101527648_COMP3123-exec06](https://github.com/rasulbayli/101527648_COMP3123-exec06). Do not include the private `.env` file in the repository.

You are to create a fullstack web application from scratch in an empty folder. The stack includes:

- **Frontend**: React (using Vite)
- **Backend**: Express (Node.js)
- **Database**: PostgreSQL
- **Containerization**: Docker and Docker Compose
  Build this project ground-up. Organize it as follows:

```
my-app/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── index.js
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── docker-compose.yml
└── .env
```

---

### FRONTEND

- Use **React** and **Vite**.
- Should call the backend API at `/api/test` and display the response.
- Runs on port **3000**.
- Dockerfile must:

  - Use node:18
  - Install deps
  - Copy code
  - Run `npm run dev`

---

### BACKEND

- Use **Express**.
- Connect to **PostgreSQL** using `pg` or `knex`.
- Create a basic `GET /api/test` endpoint.
- Use `dotenv` to read `POSTGRES_URI` or equivalent.
- Should run on port **5000**.
- Dockerfile must:

  - Use node:18
  - Install deps
  - Copy code
  - Run `node index.js` (or use `nodemon` in dev)

---

### DATABASE

- Use official **Postgres Docker image**.
- Expose internally as `postgres:5432`.
- Use volume for data persistence.
- Set default credentials via environment:

  - POSTGRES_DB=mydb
  - POSTGRES_USER=myuser
  - POSTGRES_PASSWORD=mypassword

---

### DOCKER COMPOSE

- Must define 3 services: `frontend`, `backend`, `postgres`.
- Must expose:

  - Port 3000 for frontend
  - Port 5000 for backend
  - Port 5432 for PostgreSQL (optional)

- Set environment vars in `.env` and use them.
- Backend should depend on `postgres` and wait for DB before running.
- Mount volumes for live development.

---

### ENV FILE `.env`

```
POSTGRES_DB=mydb
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_URI=postgresql://myuser:mypassword@postgres:5432/mydb
```

---

### DEVELOPMENT EXTRAS

- Use `nodemon` in backend for dev reload.
- Mount volumes for frontend/backend to enable hot-reload.
- Optionally:

  - Add a DB init script or `knex` migration.
  - Serve frontend static files from backend in production.

---

### EXPECTED RESULT

After running:

```bash
docker-compose up --build
```

- `http://localhost:3000` shows the React app
- `http://localhost:5000/api/test` returns JSON
- PostgreSQL is running and accessible internally as `postgres`
- All services run inside Docker
- Code changes reflect automatically (dev mode)

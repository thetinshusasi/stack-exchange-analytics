# Stack Exchange Analytics

Build a Stack Exchange Analytics Dashboard where users can:

- [ ] Search questions
- [ ] View question details
- [ ] See answers for each question
- [ ] Filter by tags
- [ ] View user profiles
- [ ] View top users by reputation
- [ ] View trending tags
- [ ] View unanswered questions
- [ ] Analyze accepted answers
- [ ] Search full-text content
- [ ] Paginate large datasets efficiently
- [ ] Build admin/analytics dashboards
- [ ] Deploy the full app using Docker
- [ ] Test frontend, backend, and E2E flows

## Database setup

The project uses Postgres 18 in Docker, seeded from a Stack Exchange SQL dump (`dump-stackoverflow2010-202408101013.sql`).

### 1. Start Postgres

```bash
docker compose up -d
```

Postgres runs on host port `5433` (mapped to container `5432`).
Credentials: db `stackexchange`, user `stackexchange`, password `password`.

### 2. Import the dump

```bash
docker exec -i sea-postgres psql -U stackexchange -d stackexchange < dump-stackoverflow2010-202408101013.sql
```

The dump is ~1.5 GB and ignored by git — download it separately and place it at the repo root.

### 3. Verify

```bash
docker exec -it sea-postgres psql -U stackexchange -d stackexchange -c "\dt"
```

### Connection string

```
postgres://stackexchange:password@localhost:5433/stackexchange
```

### Common commands

```bash
docker compose down            # stop containers (keeps data)
docker compose down -v         # stop and wipe the volume
docker compose logs -f postgres
```

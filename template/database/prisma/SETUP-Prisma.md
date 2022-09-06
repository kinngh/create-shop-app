# Setup Prisma

There have been additional scripts added in to make working with Postgre + Prisma easier.

- [ ] NPM Scripts
  - `postgre:create`: Creates a `postgre/` directory at root ready to run db on and is already added to your `.gitignore`.
  - `postgre:start`: Starts Postgre server at `postgre/` to keep database scoped to this project.
  - `postgre:stop`: Stops the Postgre server.
  - `prisma:create`: Pushes data structure to your Postgre database.

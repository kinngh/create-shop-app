# Notes

Notes here are markers for how I feel something is happening and how I want to change it.

- [ ] Maybe the structure is wrong. Instead of templates having subfolders, won't it make more sense to have a base template, then files that we replace in runtime and then delete the others?
  - `sessionStorage.js` is the base file, but it has `sessionStorage-mongodb.js`, `sessionStorage-prisma.js` and `sessionStorage-redis.js` instead. After the user has made their choices, we copy ``sessionStorage-mongodb.js` into `sessionStorage.js` and delete the three template files.

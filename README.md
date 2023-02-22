# WIP | create-shop-app

## [Announcements](https://github.com/kinngh/create-shop-app/discussions/4)

`npx create-shop-app@latest`

A Work-In-Progress, `create-shop-app` is a CLI tool to generate embedded Shopify app boilerplate with a stack of your choice. The current published package is an experimental build that is not recommended for use in production and substantial efforts are being taken to build a stable CLI tool.

The (current) experimental build includes the following choices:

- Database: MongoDB, Supabase, Prisma
- Query: Apollo Client
- Billing API: Free
- Language: JavaScript

## Why

I personally prefer `@apollo/client` and `MongoDB` to write my Shopify apps but there are times when I want to build apps with a SQL database or use React Query because the project was outsourced to us. Maintaining multiple repos isn't really easy, infact maintaining [kinngh/shopify-node-express-mongodb-app](http://github.com/kinngh/shopify-node-express-mongodb-app) is a lot of work in itself but I have really great feedback from engineers on this. So I went ahead and created a CLI tool to generate boilerplate code that allows you to choose your stack.

The entire CLI is built in a way to make it as easy as possible to generate your own boilerplate with a decent range of options.

## Notes

- [Setup](./SETUP.md) for setting up the CLI. To generate code, use `npx create-shop-app@latest` instead.
- There is always something that can be made better, please open an Issue, Discussion or reach out to me on [@kinngh](https://twitter.com/kinngh) on Twitter.
- The CLI uses my [kinngh/shopify-node-express-mongodb-app](http://github.com/kinngh/shopify-node-express-mongodb-app) repo as a base and swaps out tech based on choices and is opinionated.
- I recommend using [kinngh/shopify-node-express-mongodb-app](http://github.com/kinngh/shopify-node-express-mongodb-app) to open issues related to the base template since that's what is being used.

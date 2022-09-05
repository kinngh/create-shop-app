# Create Shop App

An embedded app starter template to get up and ready with Shopify app development with your preferred tech stack. This is heavily influenced by the choices Shopify Engineering team made in building their [starter template](https://github.com/Shopify/shopify-app-template-node), and more.

I've also included [notes](/NOTES.md) on this repo which goes over the repo on why certain choices were made.

### Other Repositories:

- [shopify-node-express-mongodb-app](https://github.com/kinngh/shopify-node-express-mongodb-app): The repo that started it all; Built with JavaScript, MongoDB, Express, Vite and Apollo/Client.

- [Polaris Playground](https://github.com/kinngh/shopify-polaris-playground): A Shopify Polaris playground to build your interfaces and directly drop them in this repo, with the exception of `App.jsx`.

- [Learning how to build Shopify apps](https://github.com/kinngh/learning-shopify-app): A repo with webhooks, scopes, basic controllers and more setup so newcomers on the Shopify platform can learn what's called and what's required when planning out their build.

## Tech Stack

- React.js.
  - `raviger` for easier routing.
- Express.js.
- Vite.
- Ngrok.
- Your choices.

## Why I made this

The Shopify CLI generates an amazing starter app but it still needs some more boilerplate code and customizations so I can jump on to building apps with a simple clone. This includes:

- Custom session and database management.
- Monetization ready to go.
- Webhooks isolated and setup.
- React routing taken care of (I miss Next.js mostly because of routing and under the hood improvements).
- Misc boilerplate code and templates to quickly setup inApp subscriptions, routes, webhooks and more.

## Notes

### Setup

- Refer to [SETUP](/SETUP.md)

### Misc

- Storing data is kept to a minimal to allow building custom models for flexibility.
  - Session persistence is also kept to a minimal and based on the Redis example provided by Shopify, but feel free to modify as required.
- When pushing to production, add `__templates` to `.gitignore`.

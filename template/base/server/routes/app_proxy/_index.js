const proxyRouter = require("express").Router();

proxyRouter.get("/json", (req, res) => {
  const response = { alive: "true." };
  res.send(response);
});

module.exports = proxyRouter;

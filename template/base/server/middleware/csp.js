const csp = (req, res, next) => {
  const shop = req.query.shop;

  res.setHeader(
    "Content-Security-Policy",
    `frame-ancestors https://${shop} https://admin.shopify.com;`
  );
  next();
};

module.exports = csp;

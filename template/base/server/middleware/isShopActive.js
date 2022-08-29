const isShopActive = async (req, res, next) => {
  const { shop } = req.query;

  if (!shop) {
    next();
    return;
  }

  const isShopAvaialble = "";

  if (isShopAvaialble === null || !isShopAvaialble.isActive) {
    if (isShopAvaialble === null) {
    } else if (!isShopAvaialble.isActive) {
    }
    res.redirect(`/auth?shop=${shop}`);
  } else {
    next();
  }
};

module.exports = isShopActive;

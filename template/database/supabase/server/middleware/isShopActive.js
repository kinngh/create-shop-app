const {
  selectStore,
  upsertStore,
} = require("../../utils/models/StoreModel.js");

const isShopActive = async (req, res, next) => {
  const { shop } = req.query;

  if (!shop) {
    next();
    return;
  }

  const { data, error } = await selectStore({ shop });

  if (error) {
    console.error(`Error in isShopActive`, error);
    return;
  }
  const isShopAvailable = data[0];

  if (isShopAvailable === null || !isShopAvailable?.isActive) {
    const { data, error } = await upsertStore({ shop, isActive: false });
    res.redirect(`/auth?shop=${shop}`);
  } else {
    next();
  }
};

module.exports = isShopActive;

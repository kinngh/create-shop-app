const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const isShopActive = async (req, res, next) => {
  const { shop } = req.query;

  if (!shop) {
    next();
    return;
  }

  const isShopAvaialble = await prisma.active_stores.findUnique({
    where: { shop: shop },
  });

  if (isShopAvaialble === null || !isShopAvaialble.isActive) {
    if (isShopAvaialble === null) {
      await prisma.active_stores.create({
        data: { shop: shop, isActive: false },
      });
    } else if (!isShopAvaialble.isActive) {
      await prisma.active_stores.update({
        data: { isActive: false },
        where: { shop: shop },
      });
    }
    res.redirect(`/auth?shop=${shop}`);
  } else {
    next();
  }
};

module.exports = isShopActive;

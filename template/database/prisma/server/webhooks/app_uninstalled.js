/*
    A good practice is to delete EVERYTHING you have on the store when this webhook is called, to avoid reinstall issues.
*/

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const appUninstallHandler = async (topic, shop, webhookRequestBody) => {
  await prisma.active_stores.update({
    data: {
      isActive: false,
    },
    where: {
      shop: shop,
    },
  });

  await prisma.session.deleteMany({
    where: {
      shop: shop,
    },
  });
};

module.exports = appUninstallHandler;

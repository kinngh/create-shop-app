/*
    Based on the Redis example from shopify-node-api [Accessed: April 5, 2022]
    https://github.com/Shopify/shopify-node-api/blob/main/docs/usage/customsessions.md
*/

const { Shopify } = require("@shopify/shopify-api");
const Cryptr = require("cryptr");
const {
  Session,
} = require("@shopify/shopify-api/dist/auth/session/session.js");
const { PrismaClient } = require("@prisma/client");
const cryption = new Cryptr(process.env.ENCRYPTION_STRING);

const prisma = new PrismaClient();

const storeCallback = async (session) => {
  const result = await prisma.session.findUnique({ where: { id: session.id } });

  if (result === null) {
    await prisma.session.create({
      data: {
        id: session.id,
        content: cryption.encrypt(JSON.stringify(session)),
        shop: session.shop,
      },
    });
  } else {
    await prisma.session.update({
      data: {
        content: cryption.encrypt(JSON.stringify(session)),
        shop: session.shop,
      },
      where: {
        id: session.id,
      },
    });
  }

  return true;
};

const loadCallback = async (id) => {
  const sessionResult = await prisma.session.findUnique({ where: { id: id } });
  if (sessionResult.content.length > 0) {
    const sessionObj = JSON.parse(cryption.decrypt(sessionResult.content));
    return Session.cloneSession(sessionObj, sessionObj.id);
  }
  return undefined;
};

const deleteCallback = async (id) => {
  await prisma.session.deleteMany({
    where: {
      id: id,
    },
  });
  return true;
};

const sessionStorage = new Shopify.Session.CustomSessionStorage(
  storeCallback,
  loadCallback,
  deleteCallback
);

module.exports = sessionStorage;

const { Shopify } = require("@shopify/shopify-api");
const {
  Session,
} = require("@shopify/shopify-api/dist/auth/session/session.js");
const {
  upsertSession,
  selectSession,
  deleteSession,
} = require("./models/SessionModel");

const Cryptr = require("cryptr");
const cryption = new Cryptr(process.env.ENCRYPTION_STRING);

const storeCallback = async (session) => {
  const { error } = await upsertSession({
    id: session.id,
    content: cryption.encrypt(JSON.stringify(session)),
    shop: session.shop,
  });

  if (error) {
    console.error("--> Error from storeCallback", error);
  }

  return true;
};

const loadCallback = async (id) => {
  const { data, error } = await selectSession({ id });

  if (data) {
    const sessionObj = JSON.parse(cryption.decrypt(data[0].content));
    return Session.cloneSession(sessionObj, sessionObj.id);
  }

  if (error) {
    console.error(error);
    return undefined;
  }
};

const deleteCallback = async (id) => {
  const { data, error } = await deleteSession({ id });

  if (data) {
    return true;
  }

  if (error) {
    console.error(`--> An error occured deleting session data`);
    return false;
  }
};

const sessionStorage = new Shopify.Session.CustomSessionStorage(
  storeCallback,
  loadCallback,
  deleteCallback
);

module.exports = sessionStorage;

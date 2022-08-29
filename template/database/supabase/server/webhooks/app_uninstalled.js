/*
    A good practice is to delete EVERYTHING you have on the store when this webhook is called, to avoid reinstall issues.
*/

const { deleteSession } = require("../../utils/models/SessionModel");
const { deleteStore } = require("../../utils/models/StoreModel");

const appUninstallHandler = async (topic, shop, webhookRequestBody) => {
  const { data: sessionData, error: sessionError } = await deleteSession({
    shop,
  });
  const { data: storeData, error: storeError } = await deleteStore({ shop });

  if (!sessionError && !storeError) {
    console.log(`--> Deleted data for ${shop}`);
  }
};

module.exports = appUninstallHandler;

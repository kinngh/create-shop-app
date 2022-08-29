/*
    A good practice is to delete EVERYTHING you have on the store when this webhook is called, to avoid reinstall issues.
*/

const appUninstallHandler = async (topic, shop, webhookRequestBody) => {};

module.exports = appUninstallHandler;

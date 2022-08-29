/*
    Delete the information on this store.
*/

/*
 {
    "shop_id": 123456,
    "shop_domain": "store.myshopify.com"
}
*/

const shopRedact = async (topic, shop, payload) => {
  try {
    console.log(`Handle ${topic} for ${shop}`);
    console.log(payload);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

module.exports = shopRedact;

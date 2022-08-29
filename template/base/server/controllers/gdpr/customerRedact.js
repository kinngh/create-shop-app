/*
    Delete all the information on this customer + orders that are in the payload.
*/

/*
{
  "shop_id": 123456,
  "shop_domain": "store.myshopify.com",
  "customer": {
    "id": 123456,
    "email": "email@email.com",
    "phone": "123-123-1234"
  },
  "orders_to_redact": [
    123456,
    123456,
    123456
  ]
}
*/

const customerRedact = async (topic, shop, payload) => {
  try {
    console.log(`Handle ${topic} for ${shop}`);
    console.log(payload);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

module.exports = customerRedact;

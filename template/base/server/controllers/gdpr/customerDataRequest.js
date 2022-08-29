/*
    Grab all the information that's stored in your database for the orders requested and customer and email them to the customer email / reach out to them via phone.
*/

/*
{
  "shop_id": 123456,
  "shop_domain": "store.myshopify.com",
  "orders_requested": [
    123456,
    123456,
    123456,
  ],
  "customer": {
    "id": 123456,
    "email": "email@email.com",
    "phone": "123-123-1231"
  },
  "data_request": {
    "id": 1111
  }
}
*/

const customerDataRequest = async (topic, shop, payload) => {
  try {
    console.log(`Handle ${topic} for ${shop}`);
    console.log(payload);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

module.exports = customerDataRequest;

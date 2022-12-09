/**
 *
 * CUSTOMER_DATA_REQUEST
 *
 */

const customerDataRequest = async (topic, shop, webhookRequestBody) => {
  // Payload
  // {
  //   "shop_id": 123456,
  //   "shop_domain": "store.myshopify.com",
  //   "orders_requested": [
  //     123456,
  //     123456,
  //     123456,
  //   ],
  //   "customer": {
  //     "id": 123456,
  //     "email": "email@email.com",
  //     "phone": "123-123-1231"
  //   },
  //   "data_request": {
  //     "id": 1111
  //   }
  // }
  try {
    console.log(`Handle ${topic} for ${shop}`);
    console.log(webhookRequestBody);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export default customerDataRequest;

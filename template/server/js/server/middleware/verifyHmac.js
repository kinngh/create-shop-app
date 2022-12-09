import crypto from "crypto";
import { Shopify } from "@shopify/shopify-api";

const verifyHmac = (req, res, next) => {
  try {
    const generateHash = crypto
      .createHmac("SHA256", process.env.SHOPIFY_API_SECRET)
      .update(JSON.stringify(req.body), "utf8")
      .digest("base64");
    const hmac = req.headers["x-shopify-hmac-sha256"];

    if (Shopify.Utils.safeCompare(generateHash, hmac)) {
      next();
    } else {
      return res.status(401).send();
    }
  } catch (e) {
    console.log(e);
    return res.status(401).send();
  }
};

export default verifyHmac;

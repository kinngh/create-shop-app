//MARK:- ToDo

const usePay = require("express").Router();

usePay.get("/usageLimit", async (req, res) => {
  //Get a usage limit of $1000
  res.send({ done: "done" });
});

usePay.get("/incurUsage", async (req, res) => {
  //Make an enum and add to db about what the user did that incurred a usage charge
  res.send({ done: "done" });
});

module.exports = usePay;

const express = require('express');
const router = express.Router();

module.exports = router;

const serviceOrders = require("../controllers/serviceorder.controller.js");

router.post("/form", serviceOrders.createServiceorder);


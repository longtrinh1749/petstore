const express = require('express');
const router = express.Router();

module.exports = router;

const petOrders = require("../controllers/petorder.controller.js");

router.post("/form", petOrders.createPetOrder);


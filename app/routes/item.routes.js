const express = require('express');
const router = express.Router();

module.exports = router;

const items = require("../controllers/item.controller.js");

router.get("/all", items.findAll);

router.post("/get", items.find);

router.get("/getById", items.findById);

router.get("/getByName", items.findByName);

router.get("/getByIdAndSize", items.findByIdandSize);

router.get("/item", (req, res) => {
    res.json({what: "the fuck"});
});


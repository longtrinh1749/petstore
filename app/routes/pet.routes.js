// module.exports = app => {
//     const pets = require("../controllers/pet.controller.js");
//
//     app.get("/pets/all", pets.findAll);
//
//     app.get("/pets/:petDescription", pets.findByDescription);
//
//     app.get("/pet", (req, res) => {
//         res.json({what: "the fuck"});
//     })
// }

const express = require('express');
const router = express.Router();

module.exports = router;

const pets = require("../controllers/pet.controller.js");

router.get("/all", pets.findAll);

router.get("/get", pets.getByDescription);

router.post("/get", pets.find);

router.get("/:petDescription", pets.findByDescription);

router.get("/pet", (req, res) => {
    res.json({what: "the fuck"});
});


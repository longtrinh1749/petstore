module.exports = app => {
    const pets = require("../controllers/pet.controller.js");

    app.get("/pets", pets.findAll);

    app.get("/pets/:petDescription", pets.findByDescription);

    app.get("/pet", (req, res) => {
        res.json({what: "the fuck"});
    })

}
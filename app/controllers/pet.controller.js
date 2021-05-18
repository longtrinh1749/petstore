const Pet = require("../models/pet.model");

exports.findAll = (req, res) => {
    Pet.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occurred while get all pet."
            });
        else res.send(data);
    });
};

exports.findByDescription = (req, res) => {
    Pet.getFromDescription(req.params.petDescription, (err, data) => {
        if(err) {
            if (err.kind === "not found") {
                res.status(404).send({
                    message: "Not found pet with description."
                });
            } else {
                res.status(500).send({
                    message: err.message || "Some error occurred while get pet with description."
                });
            }
        } else {
            res.send(data);
        }
    })
};
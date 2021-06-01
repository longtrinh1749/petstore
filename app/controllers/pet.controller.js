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
            if (err.kind === "not_found") {
                // res.status(404).send({
                //     message: "Not found pet with description."
                // });
                res.send({});
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

exports.getByDescription = (req, res) => {
    Pet.getFromDescription(req.query.petDescription, (err, data) => {
        if(err) {
            if (err.kind === "not_found") {
                // res.status(404).send({
                //     message: "Not found pet with description."
                // });
                res.send({});
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

exports.find = (req, res) => {
    pet = req.body;
    console.log(pet.id);
    Pet.get(pet, (err, data) => {
        if(err) {
            if (err.kind === "not_found") {
                res.send({});
            } else {
                res.status(500).send({
                    message: err.message || "Some error occurred while get pet info."
                });
            }
        } else {
            res.send(data);
        }
    })
}

exports.createPet = (req, res) => {
    let data;
    // if (req.params) data = req.params;
    // else if(req.body) data = req.body;
    // else res.status(400).send({message: "Request content cannot be empty."});

    data = req.body;

    const pet = new Pet({
        id: data.id,
        name: data.name,
        breed: data.breed,
        female: data.female,
        origin: data.origin,
        age: data.age,
        weight: data.weight,
        description: data.description,
        price: data.price,
        imageurl: data.imageurl
    });

    Pet.create(pet, (err, data) => {
        if(err) {
            res.status(500).send({message: err.message || "Errors occurred inserting Pet to database."})
        } else {
            res.send(data);
        }
    })
}

exports.updatePet = (req, res) => {
    let data;
    // if (req.params) data = req.params;
    // else if(req.body) data = req.body;
    // else res.status(400).send({message: "Request content cannot be empty."});

    data = req.body;

    const pet = new Pet({
        id: data.id,
        name: data.name,
        breed: data.breed,
        female: data.female,
        origin: data.origin,
        age: data.age,
        weight: data.weight,
        description: data.description,
        price: data.price,
        imageurl: data.imageurl
    });

    Pet.update(pet, (err, data) => {
        if(err) {
            res.status(500).send({message: err.message || "Errors occurred updating Pet from database."})
        } else {
            res.send(data);
        }
    })
}
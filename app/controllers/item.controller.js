const Item = require("../models/item.model");

exports.findAll = (req, res) => {
    Item.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occurred while get all item."
            });
        else res.send(data);
    });
};

exports.findByName = (req, res) => {
    Item.getFromName(req.query.itemName, (err, data) => {
        if(err) {
            if (err.kind === "not_found") {
                // res.status(404).send({
                //     message: "Not found item with description."
                // });
                res.send({});
            } else {
                res.status(500).send({
                    message: err.message || "Some error occurred while get item with description."
                });
            }
        } else {
            res.send(data);
        }
    })
};

exports.findById = (req, res) => {
    console.log(req.query);
    Item.getFromId(req.query.itemId, (err, data) => {
        if(err) {
            if (err.kind === "not_found") {
                // res.status(404).send({
                //     message: "Not found item with description."
                // });
                res.send({});
            } else {
                res.status(500).send({
                    message: err.message || "Some error occurred while get item with description."
                });
            }
        } else {
            res.send(data);
        }
    })
};

exports.find = (req, res) => {
    item = req.body;
    console.log(item.id);
    Item.get(item, (err, data) => {
        if(err) {
            if (err.kind === "not_found") {
                res.send({});
            } else {
                res.status(500).send({
                    message: err.message || "Some error occurred while get item info."
                });
            }
        } else {
            res.send(data);
        }
    })
}

exports.createItem = (req, res) => {
    let data;
    // if (req.query) data = req.query;
    // else if(req.body) data = req.body;
    // else res.status(400).send({message: "Request content cannot be empty."});

    data = req.body;

    const item = new Item({
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        description: data.description,
        size: data.size,
        discount: data.discount,
        imageurl: data.imageurl
    });

    Item.create(item, (err, data) => {
        if(err) {
            res.status(500).send({message: err.message || "Errors occurred inserting Item to database."})
        } else {
            res.send(data);
        }
    })
}

exports.updateItem = (req, res) => {
    let data;
    // if (req.query) data = req.query;
    // else if(req.body) data = req.body;
    // else res.status(400).send({message: "Request content cannot be empty."});

    data = req.body;

    const item = new Item({
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        description: data.description,
        size: data.size,
        discount: data.discount,
        imageurl: data.imageurl
    });

    Item.update(item, (err, data) => {
        if(err) {
            res.status(500).send({message: err.message || "Errors occurred updating Item from database."})
        } else {
            res.send(data);
        }
    })
}
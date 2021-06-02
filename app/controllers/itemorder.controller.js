const ItemOrder = require("../models/itemorder.model");

exports.createItemOrder = (req, res) => {
    let data;
    // if (req.params) data = req.params;
    // else if(req.body) data = req.body;
    // else res.status(400).send({message: "Request content cannot be empty."});
    data = req.body;

    const itemOrder = new ItemOrder({
        name: data.name,
        email: data.email,
        phoneno: data.phoneno,
        itemIdList: data.itemIdList,
        note: data.note
    });

    ItemOrder.create(itemOrder, (err, data) => {
        if(err) {
            res.status(500).send({message: err.message || "Errors occurred inserting Itemorder to database."})
        } else {
            res.send(data);
        }
    })
}

// exports.findAll = (req, res) => {
//     Item.getAll((err, data) => {
//         if(err)
//             res.status(500).send({
//                 message: err.message || "Some error occurred while get all item."
//             });
//         else res.send(data);
//     });
// };

// exports.findByName = (req, res) => {
//     Item.getFromName(req.params.itemName, (err, data) => {
//         if(err) {
//             if (err.kind === "not_found") {
//                 // res.status(404).send({
//                 //     message: "Not found item with description."
//                 // });
//                 res.send({});
//             } else {
//                 res.status(500).send({
//                     message: err.message || "Some error occurred while get item with description."
//                 });
//             }
//         } else {
//             res.send(data);
//         }
//     })
// };

// exports.findById = (req, res) => {
//     Item.getFromId(req.params.itemId, (err, data) => {
//         if(err) {
//             if (err.kind === "not_found") {
//                 // res.status(404).send({
//                 //     message: "Not found item with description."
//                 // });
//                 res.send({});
//             } else {
//                 res.status(500).send({
//                     message: err.message || "Some error occurred while get item with description."
//                 });
//             }
//         } else {
//             res.send(data);
//         }
//     })
// };

// exports.find = (req, res) => {
//     item = req.body;
//     console.log(item.id);
//     Item.get(item, (err, data) => {
//         if(err) {
//             if (err.kind === "not_found") {
//                 res.send({});
//             } else {
//                 res.status(500).send({
//                     message: err.message || "Some error occurred while get item info."
//                 });
//             }
//         } else {
//             res.send(data);
//         }
//     })
// }

// exports.updateItem = (req, res) => {
//     let data;
//     if (req.params) data = req.params;
//     else if(req.body) data = req.body;
//     else res.status(400).send({message: "Request content cannot be empty."});
//
//     const item = new Item({
//         name: data.name,
//         price: data.price,
//         quantity: data.quantity,
//         description: data.description,
//         size: data.size,
//         discount: data.discount,
//         imageurl: data.imageurl
//     });
//
//     Item.update(item, (err, data) => {
//         if(err) {
//             res.status(500).send({message: err.message || "Errors occurred updating Item from database."})
//         } else {
//             res.send(data);
//         }
//     })
// }
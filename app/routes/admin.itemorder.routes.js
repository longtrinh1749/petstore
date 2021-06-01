const express = require('express');
const session = require('express-session');
const routes = express.Router();
const Itemorder = require("../models/itemorder.model");

const path = require('../config')

module.exports = routes;

routes.get("/", (req, res) => {
    if(req.session.admin) res.sendFile(path.views + "/admin/itemorder.html");
    else {
        res.redirect("/admin");
    }
});

routes.post("/get", (req, res) => {
    itemorder = req.body;
    Itemorder.get(itemorder, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while get all item."
            });
        }
        else res.send(data);
    });
});

routes.post("/getwithlist", (req, res) => {
    itemorder = req.body;
    Itemorder.getWithList(itemorder, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while get all item."
            });
        }
        else res.send(data);
    });
});

routes.get("/all", (req, res) => {
    Itemorder.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while get all item."
            });
        }
        else res.send(data);
    });
});

routes.get("/allwithlist", (req, res) => {
    Itemorder.getAllWithList((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while get all item."
            });
        }
        else res.send(data);
    });
});

routes.post("/create", (req, res) => {
    console.log("Creating");
    if(req.session.admin) {
        itemorder = req.body;
        Itemorder.create(itemorder, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating itemorder."
                    });
                }
            } else {
                res.send();
                console.log("Insert success");
            }
        })
    }
    else {
        res.redirect("/admin")
    }
});

routes.post("/purchase", (req, res) => {
    console.log("Purchasing service order");
    if(req.session.admin) {
        itemorder = req.body;
        Itemorder.purchase(itemorder, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating itemorder."
                    });
                }
            } else {
                res.send();
                console.log("Update success");
            }
        })
    }
    else {
        res.redirect("/admin");
    }
});

routes.post("/delete", (req, res) => {
    if(req.session.admin) {
        itemorder = req.body;
        Itemorder.delete(itemorder, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating itemorder."
                    });
                }
            } else {
                res.send(data);
                console.log("Update success");
            }
        })
    }
    else {
        res.redirect("/admin")
        console.log("Lay file itemorder bang cach d nao co ?? :D ??");
    }
});

routes.post("/confirm", (req, res) => {
    if(req.session.admin) {
        itemorder = req.body;
        Itemorder.confirmOrder(itemorder, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating itemorder."
                    });
                }
            } else {
                res.send(data);
                console.log("Update success");
            }
        })
    }
    else {
        res.redirect("/admin");
    }
});



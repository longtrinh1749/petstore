const express = require('express');
const session = require('express-session');
const routes = express.Router();
const Petorder = require("../models/petorder.model");

const path = require('../config')

module.exports = routes;

routes.get("/", (req, res) => {
    if(req.session.admin) res.sendFile(path.views + "/admin/petorder.html");
    else {
        res.redirect("/admin");
    }
});

routes.post("/get", (req, res) => {
    petorder = req.body;
    Petorder.get(petorder, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while get all item."
            });
        }
        else res.send(data);
    });
});

routes.get("/all", (req, res) => {
    Petorder.getAll((err, data) => {
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
        petorder = req.body;
        Petorder.create(petorder, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating petorder."
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
    console.log("Purchasing pet order");
    if(req.session.admin) {
        petorder = req.body;
        Petorder.purchase(petorder, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating petorder."
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
        petorder = req.body;
        Petorder.delete(petorder, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating petorder."
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
        console.log("Lay file petorder bang cach d nao co ?? :D ??");
    }
});

routes.post("/confirm", (req, res) => {
    if(req.session.admin) {
        petorder = req.body;
        Petorder.confirmOrder(petorder, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating petorder."
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



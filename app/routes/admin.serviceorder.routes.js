const express = require('express');
const session = require('express-session');
const routes = express.Router();
const Serviceorder = require("../models/serviceorder.model");

const path = require('../config')

module.exports = routes;

routes.get("/", (req, res) => {
    if(req.session.admin) res.sendFile(path.views + "/admin/serviceorder.html");
    else {
        res.redirect("/admin");
    }
});

routes.post("/get", (req, res) => {
    serviceorder = req.body;
    Serviceorder.get(serviceorder, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while get all item."
            });
        }
        else res.send(data);
    });
});

routes.get("/all", (req, res) => {
    Serviceorder.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while get all item."
            });
        }
        else res.send(data);
    });
});

routes.get("/getNewOrderNumber", (req, res) => {
    Serviceorder.getTotalNew((err, data) => {
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
        serviceorder = req.body;
        Serviceorder.create(serviceorder, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating serviceorder."
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
        serviceorder = req.body;
        Serviceorder.purchase(serviceorder, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating serviceorder."
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
        serviceorder = req.body;
        Serviceorder.delete(serviceorder, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating serviceorder."
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
        console.log("Lay file serviceorder bang cach d nao co ?? :D ??");
    }
});

routes.post("/confirm", (req, res) => {
    if(req.session.admin) {
        serviceorder = req.body;
        Serviceorder.confirmOrder(serviceorder, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating serviceorder."
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



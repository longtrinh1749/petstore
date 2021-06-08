const express = require('express');
const session = require('express-session');
const routes = express.Router();
const Customer = require("../models/customer.model");

const path = require('../config')

module.exports = routes;

routes.get("/all", (req, res) => {
    console.log("Adm");
    Customer.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while get all item."
            });
        }
        else res.send(data);
    });
});

routes.post("/get", (req, res) => {
    customer = req.body;
    Customer.get(customer, (err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occurred while get all item."
            });
        else res.send(data);
    });
});

routes.get("/getCustomerNumber", (req, res) => {
    Customer.getTotal((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while get all item."
            });
        }
        else {
            res.send(data);
        }
    });
});

routes.get("/getTotalPurchase", (req, res) => {
    Customer.getTotalPurchase((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while get all item."
            });
        }
        else {
            res.send(data);
        }
    });
});

routes.get("/", (req, res) => {
    if(req.session.admin) res.sendFile(path.views + "/admin/customer.html");
    else {
        res.redirect("/admin");
    }
});

routes.post("/create", (req, res) => {
    console.log("Creating");
    if(req.session.admin) {
        customer = req.body;
        Customer.create(customer, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating customer."
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

routes.post("/update", (req, res) => {
    console.log("Updating");
    if(req.session.admin) {
        customer = req.body;
        Customer.update(customer, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating customer."
                    });
                }
            } else {
                res.send();
                console.log("Update success");
            }
        })
    }
    else {
        res.redirect("/admin")
        console.log("Lay file customer bang cach d nao co ?? :D ??");
    }
});

routes.post("/delete", (req, res) => {
    if(req.session.admin) {
        customer = req.body;
        Customer.delete(customer, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating customer."
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
        console.log("Lay file customer bang cach d nao co ?? :D ??");
    }
});




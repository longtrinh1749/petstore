const express = require('express');
const session = require('express-session');
const routes = express.Router();
const Item = require("../models/item.model");

const path = require('../config')

module.exports = routes;

routes.get("/", (req, res) => {
    if(req.session.admin) res.sendFile(path.views + "/admin/item.html");
    else {
        res.redirect("/admin");
    }
});

routes.post("/create", (req, res) => {
    console.log("Creating");
    if(req.session.admin) {
        item = req.body;
        Item.create(item, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating item."
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

routes.post("/update", (req, res) => {
    console.log("Updating");
    if(req.session.admin) {
        item = req.body;
        Item.update(item, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating item."
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
        item = req.body;
        Item.delete(item, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating item."
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
        console.log("Lay file item bang cach d nao co ?? :D ??");
    }
});




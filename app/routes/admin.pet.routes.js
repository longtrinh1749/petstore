const express = require('express');
const session = require('express-session');
const routes = express.Router();
const Pet = require("../models/pet.model");

const path = require('../config')

module.exports = routes;

routes.get("/", (req, res) => {
    if(req.session.admin) res.sendFile(path.views + "/admin/pet.html");
    else {
        res.redirect("/admin");
    }
});

routes.post("/create", (req, res) => {
    console.log("Creating");
    if(req.session.admin) {
        pet = req.body;
        Pet.create(pet, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating pet."
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
        console.log("Lay file pet bang cach d nao co ?? :D ??");
    }
});

routes.post("/update", (req, res) => {
    console.log("Updating");
    if(req.session.admin) {
        pet = req.body;
        Pet.update(pet, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating pet."
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
        console.log("Lay file pet bang cach d nao co ?? :D ??");
    }
});

routes.post("/delete", (req, res) => {
    if(req.session.admin) {
        pet = req.body;
        Pet.delete(pet, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating pet."
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
        console.log("Lay file pet bang cach d nao co ?? :D ??");
    }
});




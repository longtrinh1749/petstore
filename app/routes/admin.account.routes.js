const express = require('express');
const session = require('express-session');
const routes = express.Router();
const Admin = require("../models/admin.model");

const path = require('../config')

module.exports = routes;

routes.get("/all", (req, res) => {
    Admin.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Some error occurred while get all item."
            });
        }
        else res.send(data);
    });
});

routes.post("/get", (req, res) => {
    admin = req.body;
    Admin.get(admin, (err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occurred while get all item."
            });
        else res.send(data);
    });
});

routes.get("/", (req, res) => {
    if(req.session.admin) res.sendFile(path.views + "/admin/account.html");
    else {
        res.redirect("/admin");
    }
});

routes.post("/create", (req, res) => {
    console.log("Creating");
    if(req.session.admin) {
        admin = req.body;
        Admin.create(admin, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating admin."
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
        admin = req.body;
        Admin.update(admin, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating admin."
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
        console.log("Lay file admin bang cach d nao co ?? :D ??");
    }
});

routes.post("/delete", (req, res) => {
    if(req.session.admin) {
        admin = req.body;
        Admin.delete(admin, (err, data) => {
            if(err) {
                if (err.kind === "not_found") {
                    res.send({});
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating admin."
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
        console.log("Lay file admin bang cach d nao co ?? :D ??");
    }
});


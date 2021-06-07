const express = require('express');
const session = require('express-session');
const routes = express.Router();
const Customer = require("../models/admin.model");

const path = require('../config')

module.exports = routes;

routes.get("/create", (req, res) => {
    console.log("Creating");
    if(req.session.role) {
        console.log("Exist role in session");
    }
    else {
        res.redirect("/admin");
    }
});
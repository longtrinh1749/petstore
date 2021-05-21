const express = require('express');
const session = require('express-session');
const routes = express.Router();

const path = require('../config')

module.exports = routes;

routes.get("/", (req, res) => {
    if(req.session.admin) res.sendFile(path.views + "/admin/pet.html");
    else {
        res.redirect("/admin")
        console.log("Lay file pet bang cach d nao co ?? :D ??");
    }
    // res.send("asd");
})


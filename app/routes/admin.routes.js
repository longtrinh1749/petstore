const express = require('express');
const routes = express.Router();
const session = require('express-session');
const path = require('../config');

// const admin = require('../controllers/admin.controller');
const Admin = require('../models/admin.model');
const adminPetRoutes = require('./admin.pet.routes');

module.exports = routes;

routes.get('/',(req,res) => {
    if(req.session.admin) {
        console.log("wtf Success");
        res.sendFile(path.views + "/admin/index.html");
    }
    else {
        console.log(req.session.admin);
        res.redirect("/admin/login");
    }
});

routes.get('/login',(req,res) => {
    let sess = req.session;
    if(sess.admin) {
        return res.redirect('/admin');
    } else res.sendFile(path.views + '/admin/login.html');
});

routes.post('/login', (req, res) => {
    Admin.getUser(req.body.username, req.body.password, (err, data) => {
        if(req.session.admin) {
            console.log("Co session ma");
            res.redirect("/admin")
        } else {
            if (err) {
                console.log("Err");
                res.redirect('/admin/login');
            } else {
                console.log("Success");
                req.session.admin = req.body.username;
                res.redirect("/admin")
            }
        }
    });
});

routes.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            res.redirect('/admin')
            return console.log(err);
        }
        res.redirect('/admin');
    });
});

routes.use("/pets", adminPetRoutes);


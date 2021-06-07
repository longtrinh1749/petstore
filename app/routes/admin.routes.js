const express = require('express');
const routes = express.Router();
const session = require('express-session');
const path = require('../config');

// const admin = require('../controllers/admin.controller');
const Admin = require('../models/admin.model');
const adminPetRoutes = require('./admin.pet.routes');
const adminCustomerRoutes = require('./admin.customer.routes');
const adminItemRoutes = require('./admin.item.routes')
const adminPetOrderRoutes = require('./admin.petorder.routes');
const adminServiceOrderRoutes = require('./admin.serviceorder.routes');
const adminItemOrderRoutes = require('./admin.itemorder.routes');
const adminAccountsRoutes = require('./admin.account.routes');

module.exports = routes;

routes.get('/',(req,res) => {
    if(req.session.admin) {
        console.log("wtf Success");
        res.sendFile(path.views + "/admin/index.html");
    }
    else {
        console.log(req.session.admin);
        res.redirect(req.baseUrl + "/login");
    }
});

routes.get('/login',(req,res) => {
    let sess = req.session;
    if(sess.admin) {
        // return res.redirect('/admin');
        return res.redirect(req.baseUrl);
    } else res.sendFile(path.views + '/admin/login.html');
});

routes.post('/login', (req, res) => {
    Admin.login(req.body.username, req.body.password, (err, data) => {
        if(req.session.admin) {
            console.log("Co session ma");
            res.redirect("/admin")
        } else {
            if (err) {
                console.log("Err");
                res.redirect(req.baseUrl + '/login');
            } else {
                console.log("Success");
                req.session.admin = req.body.username;
                req.session.role = data[0].role;
                // console.log('Role' + req.session.role);
                // console.log(data[0].role);
                res.cookie('role', data[0].role, { maxAge: 3600000})
                res.redirect(req.baseUrl);
            }
        }
    });
});

routes.get('/logout',(req,res) => {
    Admin.logout(req.session.admin);
    req.session.destroy((err) => {
        if(err) {
            res.redirect(req.baseUrl)
            return console.log(err);
        }
        res.redirect(req.baseUrl);
    });
});

routes.use("/pets", adminPetRoutes);
routes.use("/customers", adminCustomerRoutes);
routes.use("/items", adminItemRoutes);
routes.use("/petorders", adminPetOrderRoutes);
routes.use("/serviceorders", adminServiceOrderRoutes);
routes.use("/itemorders", adminItemOrderRoutes);
routes.use("/accounts", adminAccountsRoutes);
// routes.use


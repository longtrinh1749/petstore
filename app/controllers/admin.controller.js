// const Admin = require('../models/admin.model');
// const session = require('express-session');
//
// exports.getUser = (req, res) => {
//     Admin.getUser(req.params.username, req.params.password, (err, data) => {
//         if(err) {
//             res.redirect('/');
//         } else {
//             req.session.username = req.params.username;
//             console.log(req.session.username);
//         }
//     });
// }
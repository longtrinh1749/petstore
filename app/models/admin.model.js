const sql = require('./db');

const Admin = function (admin) {
    this.username = admin.username;
    this.password = admin.password;
};

Admin.getUser = (username, password, result) => {
    sql.query("select * from admin", [username], (err, res) => {
        if(err) {
            console.log("Err: ", err);
            result(err, null);
            return;
        } else if (!res.length) {
            console.log("Err: No username found");
            result({message: "No such username"}, null);
            return;
        } else {
            sql.query("select * from admin where id = ? and pw = ?", [username, password], (err, res) => {
                if(err) {
                    console.log("Err: ", err);
                    result(err, null);
                    return;
                } else if (!res.length) {
                    result({message: "Wrong password"}, null);
                    return;
                } else {
                    result(null, res);
                    return;
                }
            })
        }
    })
}


module.exports = Admin;

// const callback = function (err, res) {
//     if(err) console.log("Err: ", err);
//     else console.log("Result: ", res);
//     return;
// }
//
// Admin.getUser("root", "root", callback);
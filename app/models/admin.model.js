const sql = require('./db');

const Admin = function (admin) {
    this.username = admin.username;
    this.password = admin.password;
};

Admin.login = (username, password, result) => {
    sql.query("select * from admin where id = ? and pw = ?", [username, password], (err, res) => {
        if(err) {
            console.log("Err: ", err);
            result(err, null);
            return;
        } else if (!res.length) {
            console.log("Err: No username found");
            result({message: "No such username"}, null);
            return;
        } else {
            sql.query("select * from admin where id = ? and online = false", [username], (err, res) => {
                if(err) {
                    console.log("Err: ", err);
                    result(err, null);
                    return;
                } else if (!res.length) {
                    result({message: "This account is login in another computer"}, null);
                    return;
                } else {
                    sql.query("update admin set online = true where id = ?", [username]);
                    result(null, res);
                    return;
                }
            })
        }
    })
}

Admin.logout = (username) => {
    sql.query("update admin set online = false where id = ?", [username]);
}

module.exports = Admin;

const callback = function (err, res) {
    if(err) console.log("Err: ", err);
    else console.log("Result: ", res);
    return;
}
//
// Admin.getUser("root", "root", callback);
// Admin.getRole("root", callback);
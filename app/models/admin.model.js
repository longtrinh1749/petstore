const sql = require('./db');

const Admin = function (admin) {
    this.username = admin.username;
    this.password = admin.password;
    this.role = admin.role;
    this.online = admin.online;
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

Admin.getAll = result => {
    sql.query("select * from admin where role != 'ADMIN'", (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        // console.log('admins: ', res);
        result(null, res);
    });
};

Admin.get = (admin, result) => {
    admin.username = '%' + admin.username + '%';
    admin.password = '%' + admin.password + '%';
    if(admin.role !== "EMPLOYEE") admin.role = "";
    admin.role = '%' + admin.role + '%';
    admin.online = '%' + admin.online + '%';
    sql.query("select * from admin where id like N? and pw like N? and role like N? and online like N? and role != 'ADMIN';",
        [admin.username, admin.password, admin.role, admin.online],
        (err, res) => {
            if (err) {
                console.log("Err: ", err);
                result(err, null);
                return;
            }
            if (!res.length) {
                result({kind: "not_found"}, null);
                return;
            } else {
                console.log("Found admins: ", res);
                result(null, res);
                return;
            }
        })
}

Admin.create = (admin, result) => {
    if(admin.role !== "EMPLOYEE") admin.role = "EMPLOYEE";
    if(!admin.password) admin.password = "";
    if(!admin.role) admin.role = "";
    admin.online = false;
    sql.query("insert into admin (`id`, `pw`, `role`, `online`) values (?, ?, ?, ?);", 
        [admin.username, admin.password, admin.role, admin.online] ,
        (err, res) => {
            if (err) {
                console.log("Err creating admin: ", err);
                result(err, null);
                return;
            } else if (!res.affectedRows) {
                console.log("Err create admin: Error in database (maybe duplicate id?).");
                result({message: "Err create admin: Error in database (maybe duplicate id?)."}, null);
                return;
            } else if (res.affectedRows) {
                console.log("Inserted admin into table");
                result(null, res);
                return;
            }
        });
}

Admin.update = (admin, result) => {
    if(admin.role !== "EMPLOYEE") admin.role = "";
    sql.query("update admin set pw = ?, role = ?, online = ?" +
        "where id = ?", [admin.password, admin.role,
        admin.online, admin.username], (err, res) => {
        if (err) {
            console.log("Err updating admin: ", err);
            result(err, null);
            return;
        } else if (!res.affectedRows) {
            console.log("Err update admin: Error in database (maybe cannot find id?).");
            result({message: "Err create admin: Error in database (maybe cannot find id?)."}, null);
            return;
        } else if (res.affectedRows) {
            console.log("Updated table admin");
            result(null, res);
            return;
        }
    });
}

Admin.delete = (admin, result) => {
    sql.query("delete from admin where id = ?", [admin.username], (err, res) => {
        console.log(admin.username);
        if (err) {
            console.log("Err deleting admin: ", err);
            result(err, null);
            return;
        } else if (!res.affectedRows) {
            console.log("Err delete admin: Error in database (maybe cannot find id?).");
            result({message: "Err delete admin: Error in database (maybe cannot find id?)."}, null);
            return;
        } else if (res.affectedRows) {
            console.log("Deleted from table admin");
            result(null, res);
            return;
        }
    })
}

module.exports = Admin;

const callback = function (err, res) {
    if(err) console.log("Err: ", err);
    else console.log("Result: ", res);
    return;
}
//
// Admin.logout("root", callback);
// Admin.getRole("root", callback);
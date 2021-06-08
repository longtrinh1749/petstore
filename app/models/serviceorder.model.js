const sql = require('./db');

const Serviceorder = function (serviceorder) {
    this.id = serviceorder.id;
    this.service = serviceorder.service;
    this.name = serviceorder.name;
    this.email = serviceorder.email;
    this.phoneno = serviceorder.phoneno;
    this.requirement = serviceorder.requirement;
    this.date = serviceorder.date;

    // this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
};

// Serviceorder.getAll = result => {
//     sql.query("select * from serviceorder", (err, res) => {
//         if (err) {
//             console.log('Error: ', err);
//             result(err, null);
//             return;
//         }
//         // console.log('serviceorders: ', res);
//         result(null, res);
//     });
// };
//
// Serviceorder.get = (serviceorder, result) => {
//     serviceorder.id = '%' + serviceorder.id + '%';
//     serviceorder.service = '%' + serviceorder.service + '%';
//     serviceorder.name = '%' + serviceorder.name + '%';
//     serviceorder.email = '%' + serviceorder.email + '%';
//     serviceorder.phoneno = '%' + serviceorder.phoneno + '%';
//     sql.query("select * from serviceorder where id like N? and service like N? and name like N? and email like N? and " +
//         "phoneno like N?",
//         [serviceorder.id, serviceorder.service, serviceorder.name, serviceorder.email, serviceorder.phoneno],
//         (err, res) => {
//             console.log(err, " and ", res.length);
//             if (err) {
//                 console.log("Err: ", err);
//                 result(err, null);
//                 return;
//             }
//             if (!res.length) {
//                 result({kind: "not_found"}, null);
//                 return;
//             } else {
//                 console.log("Found serviceorders: ", res);
//                 result(null, res);
//                 return;
//             }
//         })
// }
// Serviceorder.getFromKeyword = (keyword, result) => {
//     keyword = '%' + keyword + '%';
//     sql.query("select * from serviceorder where id like N? or service like N? or name like N? or email like N? or " +
//         "phoneno like N?",
//         [keyword, keyword, keyword, keyword, keyword],
//         (err, res) => {
//             console.log(err, " and ", res.length);
//             if (err) {
//                 console.log("Err: ", err);
//                 result(err, null);
//                 return;
//             }
//             console.log("tdn nhi")
//             if (!res.length) {
//                 result({kind: "not_found"}, null);
//                 return;
//             } else {
//                 console.log("Found serviceorders: ", res);
//                 result(null, res);
//                 return;
//             }
//         })
// }

Serviceorder.create = (serviceorder, result) => {
    if(!serviceorder.service) serviceorder.service = "";
    if(!serviceorder.requirement) serviceorder.requirement = "";
    if(!serviceorder.name) serviceorder.name = "";
    if(!serviceorder.phoneno) serviceorder.phoneno = "";
    if(!serviceorder.email) serviceorder.email = "";
    // if(!serviceorder.timestamp) serviceorder.timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    sql.query("insert into serviceorder (`service`, `name`, `email`, `phoneno`, `requirement`) values (?,?,?,?,?);",
        [serviceorder.service, serviceorder.name, serviceorder.email, serviceorder.phoneno, serviceorder.requirement, serviceorder.timestamp],
        (err, res) => {
            if (err) {
                console.log("Err creating serviceorder: ", err);
                result(err, null);
                return;
            } else if (!res.affectedRows) {
                console.log("Err create serviceorder: Error inside database (maybe duplicate id?).");
                result({message: "Err create serviceorder: Error inside database (maybe duplicate id?)."}, null);
                return;
            } else if (res.affectedRows) {
                console.log("Inserted serviceorder into table");
                result(null, res);
                return;
            }
        });
}

// Serviceorder.update = (serviceorder, result) => {
//     sql.query("update serviceorder set service =?, name = ?, email = ?, phoneno = ? " +
//         "where id = ?", [serviceorder.service, serviceorder.name,
//         serviceorder.email, serviceorder.phoneno, serviceorder.id], (err, res) => {
//         if (err) {
//             console.log("Err updating serviceorder: ", err);
//             result(err, null);
//             return;
//         } else if (!res.affectedRows) {
//             console.log("Err update serviceorder: Error inside database (maybe cannot find id?).");
//             result({message: "Err create serviceorder: Error inside database (maybe cannot find id?)."}, null);
//             return;
//         } else if (res.affectedRows) {
//             console.log("Updated table serviceorder");
//             result(null, res);
//             return;
//         }
//     });
// }
//
// Serviceorder.delete = (serviceorder, result) => {
//     sql.query("delete from serviceorder where id like N?", [serviceorder.id], (err, res) => {
//         console.log(serviceorder.id);
//         if (err) {
//             console.log("Err deleting serviceorder: ", err);
//             result(err, null);
//             return;
//         } else if (!res.affectedRows) {
//             console.log("Err delete serviceorder: Error inside database (maybe cannot find id?).");
//             result({message: "Err delete serviceorder: Error inside database (maybe cannot find id?)."}, null);
//             return;
//         } else if (res.affectedRows) {
//             console.log("Deleted from table serviceorder");
//             result(null, res);
//             return;
//         }
//     })
// }

Serviceorder.getAll = result => {
    sql.query("select * from serviceorder", (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        // console.log('serviceorders: ', res);
        result(null, res);
    });
};

Serviceorder.getTotalNew = result => {
    sql.query("select count(id) as total from serviceorder where timestamp is null;", (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        // console.log('itemorders: ', res);
        result(null, res);
    });
};

Serviceorder.get = (serviceorder, result) => {
    serviceorder.id = '%' + serviceorder.id + '%';
    serviceorder.service = '%' + serviceorder.service + '%';
    serviceorder.name = '%' + serviceorder.name + '%';
    serviceorder.email = '%' + serviceorder.email + '%';
    serviceorder.phoneno = '%' + serviceorder.phoneno + '%';
    serviceorder.requirement = '%' + serviceorder.requirement + '%';
    serviceorder.timestamp = '%' + serviceorder.timestamp + '%';
    serviceorder.purchaseTimestamp = '%' + serviceorder.purchaseTimestamp + '%';
    serviceorder.purchase = '%' + serviceorder.purchase + '%';
    console.log(JSON.stringify(serviceorder));
    sql.query("select * from serviceorder where id like N? and service like N? and name like N? and email like N? and " +
        "phoneno like N? and (requirement like N? or requirement is null) and (timestamp like N? or timestamp is null) and (purchaseTimestamp or purchaseTimestamp is null) like N? " +
        "and (purchase like N? or purchase is null);",
        [serviceorder.id, serviceorder.service, serviceorder.name, serviceorder.email, serviceorder.phoneno, serviceorder.requirement,
            serviceorder.timestamp, serviceorder.purchaseTimestamp, serviceorder.purchase],
        (err, res) => {
            console.log(err, " and ", res.length);
            if (err) {
                console.log("Err: ", err);
                result(err, null);
                return;
            }
            if (!res.length) {
                result({kind: "not_found"}, null);
                return;
            } else {
                console.log("Found serviceorders: ", res);
                result(null, res);
                return;
            }
        })
}
Serviceorder.getFromKeyword = (keyword, result) => {
    keyword = '%' + keyword + '%';
    sql.query("select * from serviceorder where id like N? or service like N? or name like N? or email like N? or " +
        "phoneno like N? or requirement like N?",
        [keyword, keyword, keyword, keyword, keyword, keyword],
        (err, res) => {
            console.log(err, " and ", res.length);
            if (err) {
                console.log("Err: ", err);
                result(err, null);
                return;
            }
            console.log("tdn nhi")
            if (!res.length) {
                result({kind: "not_found"}, null);
                return;
            } else {
                console.log("Found serviceorders: ", res);
                result(null, res);
                return;
            }
        })
}

Serviceorder.purchase = (serviceorder, result) => {
    purchaseTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    sql.query("update serviceorder set purchase = 25, purchaseTimestamp = ?" +
        "where id = ? and serviceorder.timestamp is not null and serviceorder.purchaseTimestamp is null and serviceorder.purchase is null;",
        [purchaseTimestamp, serviceorder.id], (err, res) => {
        if (err) {
            console.log("Err updating serviceorder: ", err);
            result(err, null);
            return;
        } else if (!res.affectedRows) {
            console.log("Err update serviceorder: Error inside database (maybe cannot find id?).");
            result({message: "Err create serviceorder: Error inside database (maybe cannot find id?)."}, null);
            return;
        } else if (res.affectedRows) {
            console.log("Updated table serviceorder");
            console.log("Service Order: " + JSON.stringify(serviceorder));
            serviceorder.purchase = 25;
            sql.query("insert into customer (`name`, `phoneno`, `email`) select * from (select ?, ?, ?) as tmp where not exists (select `phoneno` from customer where phoneno = ? ) limit 1;",
            [serviceorder.name, serviceorder.phoneno, serviceorder.email, serviceorder.phoneno]);
            sql.query("update customer c set c.name = ?, c.email = ?, c.totalPurchase = c.totalPurchase + ? where c.phoneno = ?",
            [serviceorder.name, serviceorder.email, serviceorder.purchase, serviceorder.phoneno]);
            result(null, res);
            return;
        }
    });
}

Serviceorder.delete = (serviceorder, result) => {
    sql.query("delete from serviceorder where id like N?", [serviceorder.id], (err, res) => {
        console.log(serviceorder.id);
        if (err) {
            console.log("Err deleting serviceorder: ", err);
            result(err, null);
            return;
        } else if (!res.affectedRows) {
            console.log("Err delete serviceorder: Error inside database (maybe cannot find id?).");
            result({message: "Err delete serviceorder: Error inside database (maybe cannot find id?)."}, null);
            return;
        } else if (res.affectedRows) {
            console.log("Deleted from table serviceorder");
            result(null, res);
            return;
        }
    })
}

Serviceorder.confirmOrder = (serviceorder, result) => {
    timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    sql.query("update serviceorder set serviceorder.timestamp = ? where serviceorder.id like N? and serviceorder.timestamp is null;", [timestamp, serviceorder.id], (err, res) => {
        if (err) {
            console.log("Err deleting serviceorder: ", err);
            result(err, null);
            return;
        } else if (!res.affectedRows) {
            console.log("Err delete serviceorder: Error inside database (maybe cannot find id?).");
            result({message: "Err delete serviceorder: Error inside database (maybe cannot find id?)."}, null);
            return;
        } else if (res.affectedRows) {
            console.log("Deleted from table serviceorder");
            result(null, res);
            return;
        }
    })
}

// Serviceorder.getAll(callback);
// let serviceorder = new Serviceorder({id: "P20"});
// Serviceorder.delete(serviceorder, callback);

module.exports = Serviceorder;

const callback = function (err, res) {
    if (err) console.log("Err: ", err);
    else console.log("Result: ", res);
    return;
}

// Serviceorder.getAll(callback);
// let serviceorder = new Serviceorder({id: "P20"});
// Serviceorder.delete(serviceorder, callback);

module.exports = Serviceorder;
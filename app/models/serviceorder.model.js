const sql = require('./db');

const Serviceorder = function (serviceorder) {
    this.id = serviceorder.id;
    this.petid = serviceorder.petid;
    this.name = serviceorder.name;
    this.email = serviceorder.email;
    this.phoneno = serviceorder.phoneno;

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
//     serviceorder.petid = '%' + serviceorder.petid + '%';
//     serviceorder.name = '%' + serviceorder.name + '%';
//     serviceorder.email = '%' + serviceorder.email + '%';
//     serviceorder.phoneno = '%' + serviceorder.phoneno + '%';
//     sql.query("select * from serviceorder where id like N? and petid like N? and name like N? and email like N? and " +
//         "phoneno like N?",
//         [serviceorder.id, serviceorder.petid, serviceorder.name, serviceorder.email, serviceorder.phoneno],
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
//     sql.query("select * from serviceorder where id like N? or petid like N? or name like N? or email like N? or " +
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
    if(!serviceorder.petid) serviceorder.petid = "";
    if(!serviceorder.name) serviceorder.name = "";
    if(!serviceorder.phoneno) serviceorder.phoneno = "";
    if(!serviceorder.email) serviceorder.email = 0;
    if(!serviceorder.timestamp) serviceorder.timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    sql.query("insert into serviceorder set ?;", serviceorder,
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
//     sql.query("update serviceorder set petid =?, name = ?, email = ?, phoneno = ? " +
//         "where id = ?", [serviceorder.petid, serviceorder.name,
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

const callback = function (err, res) {
    if (err) console.log("Err: ", err);
    else console.log("Result: ", res);
    return;
}

// Serviceorder.getAll(callback);
// let serviceorder = new Serviceorder({id: "P20"});
// Serviceorder.delete(serviceorder, callback);

module.exports = Serviceorder;
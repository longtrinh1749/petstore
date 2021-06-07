const sql = require('./db');

const Petorder = function (petorder) {
    this.id = petorder.id;
    this.petid = petorder.petid;
    this.name = petorder.name;
    this.email = petorder.email;
    this.phoneno = petorder.phoneno;

    // this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
};

Petorder.getAll = result => {
    sql.query("select * from petorder", (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        // console.log('petorders: ', res);
        result(null, res);
    });
};

Petorder.get = (petorder, result) => {
    petorder.id = '%' + petorder.id + '%';
    petorder.petid = '%' + petorder.petid + '%';
    petorder.name = '%' + petorder.name + '%';
    petorder.email = '%' + petorder.email + '%';
    petorder.phoneno = '%' + petorder.phoneno + '%';
    petorder.timestamp = '%' + petorder.timestamp + '%';
    petorder.purchaseTimestamp = '%' + petorder.purchaseTimestamp + '%';
    petorder.purchase = '%' + petorder.purchase + '%';
    console.log(JSON.stringify(petorder));
    sql.query("select * from petorder where id like N? and petid like N? and name like N? and email like N? and " +
        "phoneno like N? and (timestamp like N? or timestamp is null) and (purchaseTimestamp or purchaseTimestamp is null) like N? " +
        "and (purchase like N? or purchase is null);",
        [petorder.id, petorder.petid, petorder.name, petorder.email, petorder.phoneno, petorder.timestamp, petorder.purchaseTimestamp, petorder.purchase],
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
                console.log("Found petorders: ", res);
                result(null, res);
                return;
            }
        })
}
Petorder.getFromKeyword = (keyword, result) => {
    keyword = '%' + keyword + '%';
    sql.query("select * from petorder where id like N? or petid like N? or name like N? or email like N? or " +
        "phoneno like N?",
        [keyword, keyword, keyword, keyword, keyword],
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
                console.log("Found petorders: ", res);
                result(null, res);
                return;
            }
        })
}

Petorder.create = (petorder, result) => {
    if(!petorder.petid) petorder.petid = "";
    if(!petorder.name) petorder.name = "";
    if(!petorder.phoneno) petorder.phoneno = "";
    if(!petorder.email) petorder.email = 0;
    // if(!petorder.timestamp) petorder.timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    sql.query("insert into petorder (`petid`, `name`, `email`, `phoneno`) values (?, ?, ?, ?);", 
        [petorder.petid, petorder.name, petorder.email, petorder.phoneno],
        (err, res) => {
            if (err) {
                console.log("Err creating petorder: ", err);
                result(err, null);
                return;
            } else if (!res.affectedRows) {
                console.log("Err create petorder: Error inside database (maybe duplicate id?).");
                result({message: "Err create petorder: Error inside database (maybe duplicate id?)."}, null);
                return;
            } else if (res.affectedRows) {
                console.log("Inserted petorder into table");
                result(null, res);
                return;
            }
        });
}

Petorder.purchase = (petorder, result) => {
    purchaseTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    sql.query("update petorder set purchase = (select (price) from pet where id like ?), purchaseTimestamp = ? " +
        "where id = ? and petorder.timestamp is not null and petorder.purchaseTimestamp is null and petorder.purchase is null", 
        [petorder.petid, purchaseTimestamp, petorder.id], (err, res) => {
        if (err) {
            console.log("Err updating petorder: ", err);
            result(err, null);
            return;
        } else if (!res.affectedRows) {
            console.log("Err update petorder: Error inside database (maybe cannot find id?).");
            result({message: "Err create petorder: Error inside database (maybe cannot find id?)."}, null);
            return;
        } else if (res.affectedRows) {
            console.log("Updated table petorder");
            sql.query("insert into customer (`name`, `phoneno`, `email`) select * from (select ?, ?, ?) as tmp where not exists (select `phoneno` from customer where phoneno = ? ) limit 1;",
            [petorder.name, petorder.phoneno, petorder.email, petorder.phoneno]);
            sql.query("update customer c set c.name = ?, c.email = ?, c.totalPurchase = c.totalPurchase + (select (price) from pet where id like ?) where c.phoneno = ?",
            [petorder.name, petorder.email, petorder.petid, petorder.phoneno]);
            result(null, res);
            return;
        }
    });
}

Petorder.delete = (petorder, result) => {
    sql.query("delete from petorder where id like N?", [petorder.id], (err, res) => {
        console.log(petorder.id);
        if (err) {
            console.log("Err deleting petorder: ", err);
            result(err, null);
            return;
        } else if (!res.affectedRows) {
            console.log("Err delete petorder: Error inside database (maybe cannot find id?).");
            result({message: "Err delete petorder: Error inside database (maybe cannot find id?)."}, null);
            return;
        } else if (res.affectedRows) {
            console.log("Deleted from table petorder");
            result(null, res);
            return;
        }
    })
}

Petorder.confirmOrder = (petorder, result) => {
    timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    sql.query("update pet, petorder set pet.sold = true, petorder.timestamp = ? where pet.id like N? and petorder.id like N? and petorder.timestamp is null;", [timestamp, petorder.petid, petorder.id], (err, res) => {
        console.log("Petid attempting to delete"+petorder.petid);
        if (err) {
            console.log("Err deleting petorder: ", err);
            result(err, null);
            return;
        } else if (!res.affectedRows) {
            console.log("Err delete petorder: Error inside database (maybe cannot find id?).");
            result({message: "Err delete petorder: Error inside database (maybe cannot find id?)."}, null);
            return;
        } else if (res.affectedRows) {
            console.log("Deleted from table petorder");
            result(null, res);
            return;
        }
    })
}

const callback = function (err, res) {
    if (err) console.log("Err: ", err);
    else console.log("Result: ", res);
    return;
}

// Petorder.getAll(callback);
// let petorder = new Petorder({id: "P20"});
// Petorder.delete(petorder, callback);

module.exports = Petorder;
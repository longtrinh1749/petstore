const sql = require('./db');

const Customer = function (customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.phoneno = customer.phoneno;
    this.email = customer.email;
    this.address = customer.address;
    this.totalPurchase = customer.totalPurchase;
};

Customer.getAll = result => {
    sql.query("select * from customer", (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        // console.log('customers: ', res);
        result(null, res);
    });
};

Customer.get = (customer, result) => {
    customer.id = '%' + customer.id + '%';
    customer.name = '%' + customer.name + '%';
    customer.phoneno = '%' + customer.phoneno + '%';
    customer.email = '%' + customer.email + '%';
    customer.address = '%' + customer.address + '%';
    sql.query("select * from customer where id like N? and name like N? and phoneno like N? and email like N? and " +
        "address like N?",
        [customer.id, customer.name, customer.phoneno, customer.email, customer.address],
        (err, res) => {
            console.log(err, " and ", res.length);
            if (err) {
                console.log("Err: ", err);
                result(err, null);
                return;
            }
            console.log("tdn nhi");
            if (!res.length) {
                result({kind: "not_found"}, null);
                return;
            } else {
                console.log("Found customers: ", res);
                result(null, res);
                return;
            }
        })
}

Customer.create = (customer, result) => {
    if(!customer.name) customer.name = "";
    if(!customer.phoneno) customer.phoneno = "";
    if(!customer.email) customer.email = 0;
    if(!customer.address) customer.address = "";
    customer.totalPurchase = 0;
    sql.query("insert into customer (`name`, `phoneno`, `email`, `address`, `totalPurchase`) values (?, ?, ?, ?, ?) ;", 
        [customer.name, customer.phoneno, customer.email, customer.address, customer.totalPurchase],
        (err, res) => {
            if (err) {
                console.log("Err creating customer: ", err);
                result(err, null);
                return;
            } else if (!res.affectedRows) {
                console.log("Err create customer: Error inside database (maybe duplicate id?).");
                result({message: "Err create customer: Error inside database (maybe duplicate id?)."}, null);
                return;
            } else if (res.affectedRows) {
                console.log("Inserted customer into table");
                result(null, res);
                return;
            }
        });
}

Customer.update = (customer, result) => {
    sql.query("update customer set name = ?, phoneno = ?, email = ?, address = ? " +
        "where id = ?", [customer.name, customer.phoneno,
        customer.email, customer.address, customer.id], (err, res) => {
        if (err) {
            console.log("Err updating customer: ", err);
            result(err, null);
            return;
        } else if (!res.affectedRows) {
            console.log("Err update customer: Error inside database (maybe cannot find id?).");
            result({message: "Err create customer: Error inside database (maybe cannot find id?)."}, null);
            return;
        } else if (res.affectedRows) {
            console.log("Updated table customer");
            result(null, res);
            return;
        }
    });
}

Customer.delete = (customer, result) => {
    sql.query("delete from customer where id = ?", [customer.id], (err, res) => {
        console.log(customer.id);
        if (err) {
            console.log("Err deleting customer: ", err);
            result(err, null);
            return;
        } else if (!res.affectedRows) {
            console.log("Err delete customer: Error inside database (maybe cannot find id?).");
            result({message: "Err delete customer: Error inside database (maybe cannot find id?)."}, null);
            return;
        } else if (res.affectedRows) {
            console.log("Deleted from table customer");
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

// Customer.getAll(callback);

// Customer.getAll(callback);
// let customer = new Customer({id: "P20"});
// Customer.delete(customer, callback);

module.exports = Customer;
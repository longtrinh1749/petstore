const sql = require('./db');

const Item = function (item) {
    this.id = item.id;
    this.name = item.name;
    this.price = item.price;
    this.size = item.size;
    this.quantity = item.quantity;
    this.discount = item.discount;
    this.description = item.description;
    this.imageurl = item.imageurl;
};

Item.getAll = result => {
    sql.query("select * from item", (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        // console.log('items: ', res);
        result(null, res);
    });
};

Item.get = (item, result) => {
    item.id = '%' + item.id + '%';
    item.name = '%' + item.name + '%';
    item.price = '%' + item.price + '%';
    item.size = '%' + item.size + '%';
    item.quantity = '%' + item.quantity + '%';
    item.discount = '%' + item.discount + '%';
    item.description = '%' + item.description + '%';
    sql.query("select * from item where id like N? and name like N? and price like N? and size like N? and " +
        "quantity like N? and discount like N? and description like N?",
        [item.id, item.name, item.price, item.size, item.quantity, item.discount, item.description],
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
                console.log("Found items: ", res);
                result(null, res);
                return;
            }
        })
}
Item.getFromKeyword = (keyword, result) => {
    keyword = '%' + keyword + '%';
    sql.query("select * from item where id like N? or name like N? or price like N? or size like N? or " +
        "quantity like N? or discount like N? or description like N?",
        [keyword, keyword, keyword, keyword, keyword, keyword, keyword],
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
                console.log("Found items: ", res);
                result(null, res);
                return;
            }
        })
}

Item.getFromName = (itemName, result) => {
    var name = '%' + itemName + '%';
    sql.query("select * from item where name like N?", [name], (err, res) => {
        if (err) {
            console.log("Err: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found items: ", res);
            result(null, res);
            return;
        }
        result({kind: "not_found"}, null);
        return;
    })
}

Item.getFromId = (itemId, result) => {
    // var id = '%' + itemId + '%';
    var id = itemId;
    sql.query("select * from item where id like N?", [id], (err, res) => {
        if (err) {
            console.log("Err: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found items: ", res);
            result(null, res);
            return;
        }
        result({kind: "not_found"}, null);
        return;
    })
}

Item.getFromIdandSize = (itemId,itemSize, result) => {
    // var id = '%' + itemId + '%';
    var id = itemId;
    var size = itemSize;
    sql.query("select * from item where id like N? and size like N?", [id, size], (err, res) => {
        if (err) {
            console.log("Err: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found items: ", res);
            result(null, res);
            return;
        }
        result({kind: "not_found"}, null);
        return;
    })
}

Item.create = (item, result) => {
    if(!item.name) item.name = "";
    if(!item.price) item.price = 0;
    if(!item.quantity) item.quantity = 0;
    if(!item.description) item.description = "";
    if(!item.size) item.size = "";
    if(!item.discount) item.discount = 0;
    if(!item.imageurl) item.imageurl = "";

    sql.query("insert into item set ?;", item,
        (err, res) => {
            if (err) {
                console.log("Err creating item: ", err);
                result(err, null);
                return;
            } else if (!res.affectedRows) {
                console.log("Err create item: Error inside database (maybe duplicate id?).");
                result({messdiscount: "Err create item: Error inside database (maybe duplicate id?)."}, null);
                return;
            } else if (res.affectedRows) {
                console.log("Inserted item into table");
                result(null, res);
                return;
            }
        });
}

Item.update = (item, result) => {
    console.log(JSON.stringify(item));
    // sql.query("update item set name = ?, price = ?, discount = ?, description = ?, quantity = ?  " +
    //     "where id = ? and size = ?",
    //     [item.name, item.price, item.discount, item.description, item.quantity, item.id, item.size],
    //     (err, res) => {
    sql.query("update item set name = ?, price = ?, discount = ?, description = ?, quantity = ?  " +
        "where id = ? and size = ?",
        [item.name, item.price, item.discount, item.description, item.quantity, item.id, item.size],
        (err, res) => {
        if (err) {
            console.log("Err updating item: ", err);
            result(err, null);
            return;
        } else if (!res.affectedRows) {
            console.log("Err update item: Error inside database (maybe cannot find id?).");
            result({messdiscount: "Err create item: Error inside database (maybe cannot find id?)."}, null);
            return;
        } else if (res.affectedRows) {
            console.log("Updated table item");
            result(null, res);
            return;
        }
    });
}

Item.delete = (item, result) => {
    sql.query("delete from item where id like N? and size like N?", [item.id, item.size], (err, res) => {
        console.log(item.id);
        if (err) {
            console.log("Err deleting item: ", err);
            result(err, null);
            return;
        } else if (!res.affectedRows) {
            console.log("Err delete item: Error inside database (maybe cannot find id?).");
            result({messdiscount: "Err delete item: Error inside database (maybe cannot find id?)."}, null);
            return;
        } else if (res.affectedRows) {
            console.log("Deleted from table item");
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

// var item = {};
// item.id = "I12";
// item.name = "Cat Litter Box Mats";
// Item.getFromName(item.name, callback);

// Item.getAll(callback);
// let item = new Item({id: "P20"});
// Item.delete(item, callback);

module.exports = Item;
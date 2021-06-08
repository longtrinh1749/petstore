const sql = require('./db');

const Itemorder = function (itemorder) {
    this.id = itemorder.id;
    this.itemIdList = itemorder.itemIdList; // include array of object {itemid, size, quantity}
    this.itemid = itemorder.itemid;
    this.size = itemorder.size;
    this.quantity = itemorder.quantity;
    this.name = itemorder.name;
    this.email = itemorder.email;
    this.phoneno = itemorder.phoneno;
    this.note = itemorder.note;

    // this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
};

const callback = function (err, res) {
    if (err) console.log("Err: ", err);
    else console.log("Result: ", res);
    return;
}

Itemorder.getAll = result => {
    sql.query("select * from itemorder", (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        // console.log('itemorders: ', res);
        result(null, res);
    });
};

Itemorder.getTotalNew = result => {
    sql.query("select count(id) as total from itemorder where timestamp is null;", (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        // console.log('itemorders: ', res);
        result(null, res);
    });
};

Itemorder.getTotalOrder = result => {
    sql.query("select * from (select count(id) as total1 from itemorder where purchase is not null) as io, (select count(id) as total2 from petorder where purchase is not null) as po, (select count(id) as total3 from serviceorder where purchase is not null) as so;", (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        // console.log('itemorders: ', res);
        result(null, res);
    });
};

Itemorder.getTotalNew(callback);

Itemorder.get = (itemorder, result) => {
    itemorder.id = '%' + itemorder.id + '%';
    itemorder.itemIdList = '%' + itemorder.itemIdList + '%';
    itemorder.name = '%' + itemorder.name + '%';
    itemorder.email = '%' + itemorder.email + '%';
    itemorder.phoneno = '%' + itemorder.phoneno + '%';
    sql.query("select * from itemorder where id like N? and name like N? and email like N? and " +
        "phoneno like N?",
        [itemorder.id, itemorder.name, itemorder.email, itemorder.phoneno],
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
                console.log("Found itemorders: ", res);
                result(null, res);
                return;
            }
        })
}

Itemorder.getWithoutId = (itemorder) => {
    itemorder.name = '%' + itemorder.name + '%';
    itemorder.email = '%' + itemorder.email + '%';
    itemorder.phoneno = '%' + itemorder.phoneno + '%';
    sql.query("select * from itemorder where name like N? and email like N? and " +
        "phoneno like N?",
        [itemorder.name, itemorder.email, itemorder.phoneno],
        (err, res) => {
            console.log(err, " and ", res.length);
            if (err) {
                console.log("Err: ", err);
                return null;
            }
            if (!res.length) {
                return null;
            } else {
                console.log("Found itemorders: ", res);
                return res;
            }
        })
}

Itemorder.getFromKeyword = (keyword, result) => {
    keyword = '%' + keyword + '%';
    sql.query("select * from itemorder where id like N? or name like N? or email like N? or " +
        "phoneno like N?",
        [keyword, keyword, keyword, keyword],
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
                console.log("Found itemorders: ", res);
                result(null, res);
                return;
            }
        })
}

Itemorder.adminCreate = (itemorder, result) => {
    if(!itemorder.itemIdList) itemorder.itemIdList = [];
    if(!itemorder.name) itemorder.name = "";
    if(!itemorder.itemid) itemorder.itemid = "";
    if(!itemorder.phoneno) itemorder.phoneno = "";
    if(!itemorder.note) itemorder.note = "";
    if(!itemorder.email) itemorder.email = "";
    if(!itemorder.size) itemorder.size = "";
    if(!itemorder.quantity) itemorder.quantity = 0;
    // if(!itemorder.timestamp) itemorder.timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log("ItemIdList: " + itemorder.itemIdList + "\nName: " + itemorder.name + "\nPhoneno: " + itemorder.phoneno + "\nEmail: " + itemorder.email);
    console.log(JSON.stringify(itemorder));
    sql.query("insert into itemorder (`id`, `name`, `phoneno`, `email`, `note`) select * from (select ?, ?, ?, ?, ?) as tmp where not exists (select `phoneno` from itemorder where phoneno = ? and timestamp is null and purchase is null) limit 1;",
        [itemorder.id, itemorder.name, itemorder.phoneno, itemorder.email, itemorder.note, itemorder.id], (err, res) => {
            
        });
    sql.query("insert into itemorderlist (`itemid`, `size`, `orderid`, `quantity`) values (?, ?, ?, ?);",
        [itemorder.itemid, itemorder.size, itemorder.id, itemorder.quantity] ,
        (err, res) => {
            if (err) {
                console.log("Err creating itemorder: ", err);
                result(err, null);
                return;
            } else if (!res.affectedRows) {
                console.log("Err create itemorder: Error inside database (maybe duplicate id?).");
                result({message: "Err create itemorder: Error inside database (maybe duplicate id?)."}, null);
                return;
            } else if (res.affectedRows) {
                console.log("Inserted itemorder into table");
                // // result(null, res);
                // var itemorderTmp = Itemorder.getWithoutId(itemorder);
                // console.log("\nId: " + JSON.stringify(itemorderTmp));
                var asd = sql.query("SELECT LAST_INSERT_ID()", function (err, result, fields) {
                    if (err) throw err;
                    // console.log(itemorder.itemIdList);
                    let first = result[0];
                    let orderid = first[Object.keys(first)[0]];
                    Itemorder.insertToItemorderList(itemorder.itemIdList, orderid, (err) => {
                        if(err) {
                            Itemorder.delete(orderid);
                        }
                    });
                });
                result(null, res);
                // listItem = itemorder.itemIdList;
                return;
            }
        });
}

Itemorder.create = (itemorder, result) => {
    if(!itemorder.itemIdList) itemorder.itemIdList = [];
    if(!itemorder.name) itemorder.name = "";
    if(!itemorder.phoneno) itemorder.phoneno = "";
    if(!itemorder.note) itemorder.note = "";
    if(!itemorder.email) itemorder.email = "";
    console.log("ItemIdList: " + itemorder.itemIdList + "\nName: " + itemorder.name + "\nPhoneno: " + itemorder.phoneno + "\nEmail: " + itemorder.email);
    sql.query("insert into itemorder (`name`, `email`, `phoneno`, `note`) values (?, ?, ?, ?);",
        [itemorder.name, itemorder.email, itemorder.phoneno, itemorder.note] ,
        (err, res) => {
            if (err) {
                console.log("Err creating itemorder: ", err);
                result(err, null);
                return;
            } else if (!res.affectedRows) {
                console.log("Err create itemorder: Error inside database (maybe duplicate id?).");
                result({message: "Err create itemorder: Error inside database (maybe duplicate id?)."}, null);
                return;
            } else if (res.affectedRows) {
                console.log("Inserted itemorder into table");
                // // result(null, res);
                // var itemorderTmp = Itemorder.getWithoutId(itemorder);
                // console.log("\nId: " + JSON.stringify(itemorderTmp));
                var asd = sql.query("SELECT LAST_INSERT_ID()", function (err, result, fields) {
                    if (err) throw err;
                    // console.log(itemorder.itemIdList);
                    let first = result[0];
                    let orderid = first[Object.keys(first)[0]];
                    Itemorder.insertToItemorderList(itemorder.itemIdList, orderid, (err) => {
                        if(err) {
                            Itemorder.delete(orderid);
                        }
                    });
                });
                result(null, res);
                // listItem = itemorder.itemIdList;
                return;
            }
        });
}


Itemorder.insertToItemorderList = (listItem, orderId) => {
    for(i = 0; i < listItem.length; i++) {
        sql.query("insert into itemorderlist (`itemid`, `size`, `orderid`, `quantity`) " +
            "values (?, ?, ?, ?);",
            [listItem[i].itemid, listItem[i].size, orderId, listItem[i].quantity],
            (err, res) => {
                if (err) {
                    console.log("Err creating itemorderlist: ", err);
                    return;
                } else if (!res.affectedRows) {
                    console.log("Err create itemorderlist: Error inside database (maybe duplicate id?).");
                    return;
                } else if (res.affectedRows) {
                    console.log("Inserted itemorderlist into table");
                    return;
                }
            });
    }
};

Itemorder.getAllWithList = result => {
    sql.query("select * from itemorder, itemorderlist where itemorder.id = itemorderlist.orderid order by itemorder.id asc", (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        // console.log('itemorders: ', res);
        result(null, res);
    });
};

Itemorder.getWithList = (itemorderlist, result) => {
    console.log(JSON.stringify(itemorderlist));
    itemorderlist.id = '%' + itemorderlist.id + '%';
    itemorderlist.name = '%' + itemorderlist.name + '%';
    itemorderlist.email = '%' + itemorderlist.email + '%';
    itemorderlist.phoneno = '%' + itemorderlist.phoneno + '%';
    itemorderlist.timestamp = '%' + itemorderlist.timestamp + '%';
    itemorderlist.purchaseTimestamp = '%' + itemorderlist.purchaseTimestamp + '%';
    itemorderlist.purchase = '%' + itemorderlist.purchase + '%';
    itemorderlist.itemid = '%' + itemorderlist.itemid + '%';
    itemorderlist.size = '%' + itemorderlist.size + '%';
    itemorderlist.orderid = '%' + itemorderlist.orderid + '%';
    itemorderlist.quantity = '%' + itemorderlist.quantity + '%';
    sql.query("select * from itemorder, itemorderlist where itemorder.id = itemorderlist.orderid and " +
        "id like N? and name like N? and email like N? and phoneno like N? and (timestamp like N? or timestamp is null) and (purchaseTimestamp like N? or purchaseTimestamp is null)" +
        " and (purchase like N? or purchase is null) and (itemid like N? or itemid is null) and (size like N? or size is null) and (quantity like N? or quantity is null)",
         [itemorderlist.id,itemorderlist.name,itemorderlist.email,itemorderlist.phoneno,itemorderlist.timestamp,itemorderlist.purchaseTimestamp
             ,itemorderlist.purchase,itemorderlist.itemid,itemorderlist.size,itemorderlist.quantity],
         (err, res) => {
    // sql.query("select * from itemorder, itemorderlist where itemorder.id = itemorderlist.orderid and " +
    //     "id like N? and name like N? and email like N? and phoneno like N? and itemid like N? and size like N? and quantity like N?"
    //     ,
    //     [itemorderlist.id,itemorderlist.name,itemorderlist.email,itemorderlist.phoneno,itemorderlist.itemid,itemorderlist.size,itemorderlist.quantity],
    //     (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        // console.log('itemorders: ', res);
        result(null, res);
    });
};

Itemorder.purchase = (itemorder, result) => {
    purchaseTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // sql.query("update itemorder set purchase = (select (price) from pet where id like ?), purchaseTimestamp = ? " +
    //     "where id = ?", [itemorder.petid, purchaseTimestamp, itemorder.id], (err, res) => {
    //     if (err) {
    sql.query(" update itemorder set purchaseTimestamp = ?, purchase = (select sum(x.totalcost) from (select c.quantity*c.price as totalcost from " +
        "(select item.price, itemorderlist.quantity from item, itemorderlist where item.size = itemorderlist.size and item.id = itemorderlist.itemid " +
        "and orderid = ?) as c) as x) " +
        "where id = ? and itemorder.timestamp is not null and itemorder.purchaseTimestamp is null and itemorder.purchase is null;",
         [purchaseTimestamp, itemorder.id, itemorder.id], (err, res) => {
        if (err) {
            console.log("Err updating itemorder: ", err);
            result(err, null);
            return;
        } else if (!res.affectedRows) {
            console.log("Err update itemorder: Error inside database (maybe cannot find id?).");
            result({message: "Err create itemorder: Error inside database (maybe cannot find id?)."}, null);
            return;
        } else if (res.affectedRows) {
            console.log("Updated table itemorder");
            sql.query("insert into customer (`name`, `phoneno`, `email`) select * from (select ?, ?, ?) as tmp where not exists (select `phoneno` from customer where phoneno = ? ) limit 1;",
            [itemorder.name, itemorder.phoneno, itemorder.email, itemorder.phoneno]);
            sql.query("update customer c set c.name = ?, c.email = ?, c.totalPurchase = c.totalPurchase + (select sum(x.totalcost) from (select c.quantity*c.price as totalcost from " +
            "(select item.price, itemorderlist.quantity from item, itemorderlist where item.size = itemorderlist.size and item.id = itemorderlist.itemid " +
            "and orderid = ?) as c) as x) where c.phoneno = ?",
            [itemorder.name, itemorder.email, itemorder.id, itemorder.phoneno]);
            result(null, res);
            return;
        }
    });
}

Itemorder.delete = (itemorder, result) => {
    sql.query("delete from itemorder where id like N?", [itemorder.id], (err, res) => {
        console.log(itemorder.id);
        if (err) {
            console.log("Err deleting itemorder: ", err);
            result(err, null);
            return;
        } else if (!res.affectedRows) {
            console.log("Err delete itemorder: Error inside database (maybe cannot find id?).");
            result({message: "Err delete itemorder: Error inside database (maybe cannot find id?)."}, null);
            return;
        } else if (res.affectedRows) {
            console.log("Deleted from table itemorder");
            result(null, res);
            return;
        }
    })
}
// TODO: finish confirm item order
Itemorder.confirmOrder = (itemorder, result) => {
    timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // sql.query("update item, itemorder set pet.sold = true, itemorder.timestamp = ? where item.id like N? and itemorder.id like N?", [timestamp, itemorder.petid, itemorder.id], (err, res) => {
    sql.query("update item as i inner join itemorder as io inner join itemorderlist as iol on i.id = iol.itemid and i.size = iol.size and io.id = iol.orderid set i.quantity =\n" +
        "i.quantity - iol.quantity, io.timestamp = ? where io.id = ? and io.timestamp is null;",
        [timestamp, itemorder.id], (err, res) => {
        console.log("Petid attempting to delete"+itemorder.petid);
        if (err) {
            console.log("Err deleting itemorder: ", err);
            result(err, null);
            return;
        } else if (!res.affectedRows) {
            console.log("Err delete itemorder: Error inside database (maybe cannot find id?).");
            result({message: "Err delete itemorder: Error inside database (maybe cannot find id?)."}, null);
            return;
        } else if (res.affectedRows) {
            console.log("Deleted from table itemorder");
            result(null, res);
            return;
        }
    })
}

Itemorder.confirmOrder2 = (itemorder, result) => {
//     timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
//     sql.query("update item, itemorder set pet.sold = true, itemorder.timestamp = ? where item.id like N? and itemorder.id like N?", [timestamp, itemorder.petid, itemorder.id], (err, res) => {
//         console.log("Petid attempting to delete"+itemorder.petid);
//         if (err) {
//             console.log("Err deleting itemorder: ", err);
//             result(err, null);
//             return;
//         } else if (!res.affectedRows) {
//             console.log("Err delete itemorder: Error inside database (maybe cannot find id?).");
//             result({message: "Err delete itemorder: Error inside database (maybe cannot find id?)."}, null);
//             return;
//         } else if (res.affectedRows) {
//             console.log("Deleted from table itemorder");
//             result(null, res);
//             return;
//         }
//     })
    result(null, {asd:"asd"});
}

// itemorderTmp = {};
// itemorderTmp.name = "Corine Laundree";
// itemorderTmp.email = "gWsQpXb@gmail.com";
// itemorderTmp.phoneno = "0967781834";
// Itemorder.getWithoutId(itemorderTmp, callback);

// Itemorder.getAll(callback);
// let itemorder = new Itemorder({id: "P20"});
// Itemorder.delete(itemorder, callback);

module.exports = Itemorder;
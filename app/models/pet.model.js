const sql = require('./db');

const Pet = function (pet) {
    this.id = pet.id;
    this.name = pet.name;
    this.breed = pet.breed;
    this.female = pet.female;
    this.origin = pet.origin;
    this.age = pet.age;
    this.weight = pet.weight;
    this.description = pet.description;
    this.price = pet.price;
    this.imageurl = pet.imageurl;
};

Pet.getAll = result => {
    sql.query("select * from pet where sold = 0;", (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        // console.log('pets: ', res);
        result(null, res);
    });
};

Pet.get = (pet, result) => {
    pet.id = '%' + pet.id + '%';
    pet.name = '%' + pet.name + '%';
    pet.breed = '%' + pet.breed + '%';
    pet.female = '%' + pet.female + '%';
    pet.origin = '%' + pet.origin + '%';
    pet.age = '%' + pet.age + '%';
    pet.weight = '%' + pet.weight + '%';
    pet.price = '%' + pet.price + '%';
    pet.description = '%' + pet.description + '%';
    sql.query("select * from pet where id like N? and name like N? and breed like N? and female like N? and " +
        "origin like N? and age like N? and weight like N? and price like N? and description like N?",
        [pet.id, pet.name, pet.breed, pet.female, pet.origin, pet.age, pet.weight, pet.price, pet.description],
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
            console.log("Found pets: ", res);
            result(null, res);
            return;
        }
    })
}
Pet.getFromKeyword = (keyword, result) => {
    keyword = '%' + keyword + '%';
    sql.query("select * from pet where (id like N? or name like N? or breed like N? or female like N? or " +
        "origin like N? or age like N? or weight like N? or price like N? or description like N?) and sold = 0",
        [keyword, keyword, keyword, keyword, keyword, keyword, keyword, keyword, keyword],
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
                console.log("Found pets: ", res);
                result(null, res);
                return;
            }
        })
}

Pet.getFromDescription = (petDescription, result) => {
    var description = '%' + petDescription + '%';
    console.log(description);
    sql.query("select * from pet where description like N?", [description], (err, res) => {
        if (err) {
            console.log("Err: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found pets: ", res);
            result(null, res);
            return;
        }
        result({kind: "not_found"}, null);
        return;
    })
}

Pet.create = (pet, result) => {
    if(!pet.name) pet.name = "";
    if(!pet.breed) pet.breed = "";
    if(!pet.origin) pet.origin = "";
    if(!pet.description) pet.description = "";
    if(!pet.female) pet.female = 0;
    if(!pet.weight) pet.weight = 0;
    if(!pet.price) pet.price = 0;
    if(!pet.age) pet.age = 0;
    sql.query("insert into pet set ?;", pet,
        (err, res) => {
            if (err) {
                console.log("Err creating pet: ", err);
                result(err, null);
                return;
            } else if (!res.affectedRows) {
                console.log("Err create pet: Error inside database (maybe duplicate id?).");
                result({message: "Err create pet: Error inside database (maybe duplicate id?)."}, null);
                return;
            } else if (res.affectedRows) {
                console.log("Inserted pet into table");
                result(null, res);
                return;
            }
    });
}

Pet.update = (pet, result) => {
    console.log("PetLLLLL: ", pet);
    sql.query("update pet set name =?, breed = ?, age = ?, weight = ?, female = ?, origin = ?, " +
        "description = ?, price = ?, imageurl = ? where id = ?", [pet.name, pet.breed, pet.age, pet.weight,
        pet.female, pet.origin, pet.description, pet.price, pet.imageurl, pet.id], (err, res) => {
        if (err) {
            console.log("Err updating pet: ", err);
            result(err, null);
            return;
        } else if (!res.affectedRows) {
            console.log("Err update pet: Error inside database (maybe cannot find id?).");
            result({message: "Err create pet: Error inside database (maybe cannot find id?)."}, null);
            return;
        } else if (res.affectedRows) {
            console.log("Updated table pet");
            result(null, res);
            return;
        }
    });
}

Pet.delete = (pet, result) => {
    sql.query("delete from pet where id like N?", [pet.id], (err, res) => {
        console.log(pet.id);
        if (err) {
            console.log("Err deleting pet: ", err);
            result(err, null);
            return;
        } else if (!res.affectedRows) {
            console.log("Err delete pet: Error inside database (maybe cannot find id?).");
            result({message: "Err delete pet: Error inside database (maybe cannot find id?)."}, null);
            return;
        } else if (res.affectedRows) {
            console.log("Deleted from table pet");
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

// Pet.getAll(callback);
// let pet = new Pet({id: "P20"});
// Pet.delete(pet, callback);

module.exports = Pet;
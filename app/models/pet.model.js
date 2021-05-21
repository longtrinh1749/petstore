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
    sql.query("select * from pet", (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }
        console.log('pets: ', res);
        result(null, res);
    });
};

Pet.getFromDescription = (petDescription, result) => {
    var description = '%' + petDescription + '%';
    sql.query("select * from pet where description like N?", [description], (err, res) => {
        if (err) {
            console.log("Err: ", err);
            result(null, err);
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
    sql.query("insert into pet (id, name, breed, female, origin, age, weight, description, price, imageurl) " +
        "values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"),
        [pet.id, pet.name, pet.breed, pet.female, pet.origin, pet.age, pet.weight, pet.description, pet.price, pet.imageurl],
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
        }
}

Pet.update = (pet, result) => {
    sql.query("update pet set name =?, breed = ?, age = ?, weight = ?, female = ?, origin = ?, " +
        "description = ?, price = ?, imageurl = ? where id = ?", [pet.name, pet.breed, pet.age, pet.weight,
        pet.female, pet.origin, pet.description, pet.price, pet.imageurl, pet.id], (req, res) => {
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
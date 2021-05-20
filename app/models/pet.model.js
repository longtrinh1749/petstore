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
        if(err) {
            console.log('Error: ',err);
            result(null, err);
            return;
        }
        console.log('pets: ', res);
        result(null, res);
    });
};

Pet.getFromDescription = (petDescription, result) => {
    var description = '%' + petDescription + '%';
    sql.query("select * from pet where pet.description like N?", [description], (err, res) => {
        if(err) {
            console.log("Err: ", err);
            result(null, err);
            return;
        }
        if(res.length) {
            console.log("Found pets: ", res);
            result(null, res);
            return;
        }
        result({kind: "not_found"}, null);
    })
}

module.exports = Pet;
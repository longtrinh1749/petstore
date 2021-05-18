const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
	res.json({message: 'Hellu'});
})

require("./routes/pet.routes")(app);


const pets = require("./controllers/pet.controller.js");
app.get("/pets", pets.findAll);


// app.get("/pets", (req, res) => {
// 	res.json({what:"the fuck"});
// })

const port = process.env.NODEJS_LOCAL_PORT || 3000;
app.listen(port, () => {
	console.log(`App is listening on port ${port}`);
});

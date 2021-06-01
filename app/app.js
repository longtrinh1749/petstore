const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
<<<<<<< HEAD
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient();

const petRouter = require('./routes/pet.routes');
const adminRouter = require('./routes/admin.routes');
const itemRouter = require('./routes/item.routes');
const itemOrderRouter = require('./routes/itemorder.routes');
const petOrderRouter = require('./routes/petorder.routes');
const serviceOrderRouter = require('./routes/serviceorder.routes');

const pets = require("./controllers/pet.controller.js");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
	secret: 'ssshhhhh',
	// create new redis store.
	store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
	saveUninitialized: false,
	cookie: {maxAge: 8*60*60*1000}, // 8 hours
	resave: false
}));
=======

const app = express();
app.use(cors())

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));
>>>>>>> f1bfea60f454884895bf761f2efba8c59a122721

app.get("/", (req, res) => {
	res.json({message: 'Hellu'});
})

<<<<<<< HEAD
app.use("/pets", petRouter);
app.use("/admin", adminRouter);
app.use("/items", itemRouter);
app.use("/items", itemOrderRouter);
app.use("/services", serviceOrderRouter);
app.use("/adoption", petOrderRouter);
=======
require("./routes/pet.routes")(app);


const pets = require("./controllers/pet.controller.js");
app.get("/pets", pets.findAll);


// app.get("/pets", (req, res) => {
// 	res.json({what:"the fuck"});
// })
>>>>>>> f1bfea60f454884895bf761f2efba8c59a122721

const port = process.env.NODEJS_LOCAL_PORT || 3000;
app.listen(port, () => {
	console.log(`App is listening on port ${port}`);
});

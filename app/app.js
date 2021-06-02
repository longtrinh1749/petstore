const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const cors = require('cors');
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

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(session({
	secret: 'ssshhhhh',
	// create new redis store.
	store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
	saveUninitialized: false,
	cookie: {maxAge: 8*60*60*1000}, // 8 hours
	resave: false
}));

app.get("/", (req, res) => {
	res.json({message: 'Hellu'});
})

app.use("/pets", petRouter);
app.use("/admin", adminRouter);
app.use("/items", itemRouter);
app.use("/items", itemOrderRouter);
app.use("/services", serviceOrderRouter);
app.use("/adoption", petOrderRouter);

const port = process.env.NODEJS_LOCAL_PORT || 3000;
app.listen(port, () => {
	console.log(`App is listening on port ${port}`);
});

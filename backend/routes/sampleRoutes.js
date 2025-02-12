import express from "express";
import { connectToServer, _db } from "../db/conn.js"; // Ensure db/conn.js is updated to ES6
import { ObjectId } from "mongodb";


const app = express.Router();
await connectToServer()
const userCollection = _db.collection("users")
// Routes
app.get("/", async (req, res) => {

	console.log(userCollection)
	res.send("Welcome to the Express and MongoDB API!");
});

// This section will help you get a list of all the records.
app.route("/record").get(async (req, res) => {
	try {
		console.log("In record get route");
		const result = await userCollection
			.find({})
			.toArray();

		console.log("got result");
		res.json(result);
	} catch (err) {
		throw err;
	}
});

// This section will help you get a single record by id
app.get("/record/:id", async (req, res) => {
	try {
		let myquery = { _id: new ObjectId(req.params.id) };
		const result = await userCollection.findOne(myquery);

		res.json(result);
	} catch (err) {
		throw err;
	}
});

// This section will help you create a new record.
app.post("/record/add", async (req, res) => {
	try {
		let myobj = {
			name: req.body.name || "Default",
			position: req.body.position || "none",
			level: req.body.level || "temp",
		};
		const result = await userCollection.insertOne(myobj);
		res.json(result);
	} catch (err) {
		throw err;
	}
});

// This section will help you update a record by id.
app.put("/update/:id", async (req, res) => {
	try {
		let myquery = { _id: new ObjectId(req.params.id) };
		let newValues = {
			$set: {
				name: req.body.name,
				position: req.body.position,
				level: req.body.level,
			},
		};
		const result = userCollection
			.updateOne(myquery, newValues);
		console.log("1 document updated");
		res.json(result);
	} catch (err) {
		throw err;
	}
});
// This section will help you delete a record
app.delete("/:id", async (req, res) => {
	try {
		let myquery = { _id: new ObjectId(req.params.id) };
		const result = userCollection
			.deleteOne(myquery);
		console.log("1 document deleted");
		res.json(result);
	} catch (err) {
		throw err;
	}
});


export default app;

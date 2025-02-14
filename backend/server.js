import "dotenv/config";

import express, { json } from "express";
const app = express();	// same as: const car = require("");

import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import { connectToServer } from "./db/conn.js";
import sampleRoutes from "./routes/sampleRoutes.js";

app.use(json());	// uses JSON
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
		optionsSuccessStatus: 204,
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

app.use(
	session({
		secret: process.env.SECRET_KEY || "more secret", //can not be ""
		saveUninitialized: false, // Dont create sessions until something is stored
		resave: false, // dont save session if unmodified
		store: MongoStore.create({
			mongoUrl: process.env.CONNECTION_URI,
		}),
	})
);

app.use(sampleRoutes);	// see routes\sampleRoutes.js

const port = process.env.PORT && 4000; //can be zero

app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});

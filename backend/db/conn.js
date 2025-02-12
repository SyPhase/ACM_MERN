

import { MongoClient } from "mongodb";

const connectionString = process.env.CONNECTION_URI;
const dbName = process.env.MONGODB_DATABASE_NAME;

if (!connectionString || !dbName) {
  throw new Error("Environment variables CONNECTION_URI and MONGODB_DATABASE_NAME must be set");
}

console.log(connectionString);
let _db;

const connectToServer = async (callback) => {
  console.log("Attempting to connect");

  const client = new MongoClient(connectionString);

  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db(dbName).command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    _db = client.db(dbName);
    console.log(`Successfully connected to ${dbName}`);

    if (callback) callback();
  } catch (e) {
    console.error(e);
  }

  process.on("SIGINT", async () => {
    console.log("Closing MongoDB connection...");
    await client.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  });
};

const getDb = () => _db;

export { connectToServer, getDb, _db };

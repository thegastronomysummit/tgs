// src/lib/mongodb.ts 
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

// Create a MongoClient and connect
const client = new MongoClient(uri);
const clientPromise = client.connect();

export default clientPromise;
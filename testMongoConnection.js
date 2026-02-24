// testMongoConnection.js
import clientPromise from "./src/lib/mongodb.js"; // adjust path if needed

async function testConnection() {
  try {
    console.log("🔹 Attempting to connect to MongoDB...");
    const client = await clientPromise;   // <- THIS is the key
    const db = client.db("gastronomy");   // your database name
    const collections = await db.collections();
    console.log("✅ Connected to MongoDB successfully!");
    console.log("Collections:", collections.map(c => c.collectionName));
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  } finally {
    process.exit();
  }
}

testConnection();
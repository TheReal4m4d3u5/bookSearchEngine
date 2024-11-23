const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://4m4d3u5:5mDbW_D9YJ_j6De@cluster0.zcs29.mongodb.net/";
const client = new MongoClient(uri);

async function connectToDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");
    } finally {
        await client.close();
    }
}

connectToDB().catch(console.error);
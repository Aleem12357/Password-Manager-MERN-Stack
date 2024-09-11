import 'dotenv/config'
import express from 'express';
import { MongoClient } from 'mongodb'
import bodyparser from 'body-parser'
import cors from 'cors'
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassOP';
const app = express();
const port = 3000
app.use(bodyparser.json());
app.use(cors())

await client.connect();
//Get All The Passwords
app.get('/',async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    
    const findResult = await collection.find({}).toArray();

  res.json(findResult)
})

//Save a The Passwords
app.post('/',async (req, res) => {
  const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.insertOne(password);

  res.send({success: true, result: findResult})
})
//Delete a Password by id
app.delete('/',async (req, res) => {
  const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.deleteOne(password);

  res.send({success: true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
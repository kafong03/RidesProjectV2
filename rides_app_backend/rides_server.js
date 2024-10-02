const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3001;


const password = encodeURI("BCRTest");
const database = "BCRTest";
const driverEndpoint = "driver";
const passengerEndpoint = "passenger";

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://agee4:${password}@bcrtest.mnl6xgt.mongodb.net/?retryWrites=true&w=majority&appName=BCRTest`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  async function run() {
      console.log("Connecting to client")
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
  
    } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
      console.log("done");
    }
  }
  run().catch(console.dir);
  
  
app.get('/' + driverEndpoint, async (req, res) => {
    await client.connect();
   console.log("testing" + driverEndpoint + " endpoint");
   var dbo = client.db(database); // Connects to the database
   const drivers = dbo.collection("BCRDrivers"); // Get the collection to query
   const result = await drivers.find({}).toArray(); // MongoDB query
   console.log(result);
   res.send(result); //Send result as necessary
 });
 
 app.get("/" + driverEndpoint + "/:name", async (req, res) => {
    await client.connect();
   console.log("Get drivers by name");
   var name = req.params.DriverName;
   var dbo = client.db(database); // Connects to the database
   const drivers = dbo.collection("BCRDrivers"); // Get the collection to query
   const result = await drivers.find({DriverName: name}).toArray(); // multiple drivers with same name?
   res.send(result);
 });
 
 app.post("/" + driverEndpoint, async (req, res) => {
    await client.connect();
   console.log("Create new driver");
   const body = req.body;
   var dbo = client.db(database); // Connects to the database
   const drivers = dbo.collection("BCRDrivers"); // Get the collection to query
   var response = "Failed";
   try{
     response = await drivers.insertOne(body); // not sure if this works?
   }
   catch (e){
     console.log(e);
     response = e;
   };
 
   res.send(response);
 });
 
 app.put("/" + driverEndpoint + "/:id", async (req, res) => {
    await client.connect();
   console.log("Update driver by ID");
   var id = parseInt(req.params.id);
   const body = req.body;
   var dbo = client.db(database);
   const drivers = dbo.collection("BCRDrivers");
   try {
     const result = await drivers.updateOne(
       { id: id },
       { $set: body }
     );
     res.send(result);
   } catch (e) {
     console.log(e);
     res.status(500).send("Error updating driver by ID");
   }
 });
 
 app.delete("/" + driverEndpoint + '/:name', async (req, res) =>{
   console.log("Delete driver");
   var dbo = client.db(database); // Connects to the database
   const drivers = dbo.collection("BCRDrivers"); // Get the collection to query
   const name = req.params.name;
   try {
     const result = await drivers.deleteOne({ driverName: name});
     res.send(result);
   } catch (e) {
     console.log(e);
     res.status(500).send("Error deleting driver by name");
   }
 })


 app.get('/' + passengerEndpoint, async (req, res) => {
    await client.connect();
   console.log("testing " + passengerEndpoint + " endpoint");
   var dbo = client.db(database); // Connects to the database
   const passengers = dbo.collection("BCRPassengers"); // Get the collection to query
   const result = await passengers.find({}).toArray(); // MongoDB query
   console.log(result);
   res.send(result); // Send result as necessary
 });
 
 app.get("/" + passengerEndpoint + "/:name", async (req, res) => {
    await client.connect();
   console.log("Get passengers by name");
   var name = req.params.name;
   var dbo = client.db(database); // Connects to the database
   const passengers = dbo.collection("BCRPassengers"); // Get the collection to query
   const result = await passengers.find({name: name}).toArray();
   res.send(result);
 });
 
 app.post("/" + passengerEndpoint, async (req, res) => {
    await client.connect();
   console.log("Create new passenger");
   const body = req.body;
   var dbo = client.db(database); // Connects to the database
   const passengers = dbo.collection("BCRPassengers"); // Get the collection to query
   var response = "Failed";
   try{
     response = await passengers.insertOne(body); // not sure if this works?
   }
   catch (e){
     console.log(e);
     response = e;
   };
 
   res.send(response);
 });
 
 app.put("/" + passengerEndpoint + "/:id", async (req, res) => {
    await client.connect();
   console.log("Update passenger by ID");
   var id = parseInt(req.params.id);
   const body = req.body;
   var dbo = client.db(database);
   const passengers = dbo.collection("BCRPassengers");
   try {
     const result = await passengers.updateOne(
       { id: id },
       { $set: body }
     );
     res.send(result);
   } catch (e) {
     console.log(e);
     res.status(500).send("Error updating passenger by ID");
   }
 });
 
 
 app.delete("/" + passengerEndpoint + '/:name', async (req, res) =>{
   console.log("Delete passenger");
   var dbo = client.db(database);
   const passengers = dbo.collection("BCRPassengers");
   const name = req.params.name;
   try {
     const result = await passengers.deleteOne({ name: name});
     res.send(result);
   } catch (e) {
     console.log(e);
     res.status(500).send("Error deleting passenger by name");
   }
 })
 
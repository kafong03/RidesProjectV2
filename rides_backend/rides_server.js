const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3001;

const password = encodeURI("T3stR1d3");
const database = "BCCRidesDatabase";

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://BCCTest:${password}s@bccridestest.yr3738g.mongodb.net/?retryWrites=true&w=majority&appName=BCCRidesTest`;

const driverEndpoint = "driver";
const passengerEndpoint = "passenger";
const carsEndpoint = "cars";
const eventsEndpoint = "events"
const accountEndpoint = "accounts";

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
    const drivers = dbo.collection("BCCRidesDrivers"); // Get the collection to query
    const result = await drivers.find({}).toArray(); // MongoDB query
    console.log(result);
    res.send(result); //Send result as necessary
});

app.post("/" + driverEndpoint, async (req, res) => {
    await client.connect();
    console.log("Create new driver");
    const body = req.body;
    var dbo = client.db(database); // Connects to the database
    const drivers = dbo.collection("BCCRidesDrivers"); // Get the collection to query
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

 app.get("/" + driverEndpoint + "/:id", async (req, res) => {
    await client.connect();
   console.log("Get drivers by id");
   var id = req.params.id;
   var dbo = client.db(database); // Connects to the database
   const drivers = dbo.collection("BCCRidesDrivers"); // Get the collection to query
   const result = await drivers.find({_id: id}).toArray();
   res.send(result);
 });

 app.put("/" + driverEndpoint + "/:id", async (req, res) => {
    await client.connect();
   console.log("Update driver by ID");
   var id = req.params.id;
   const body = req.body;
   var dbo = client.db(database);
   const drivers = dbo.collection("BCCRidesDrivers");
   try {
     const result = await drivers.updateOne(
       { _id: id },
       { $set: body }
     );
     res.send(result);
   } catch (e) {
     console.log(e);
     res.status(500).send("Error updating driver by ID");
   }
 });
 
 app.delete("/" + driverEndpoint + '/:id', async (req, res) =>{
   console.log("Delete driver");
   var dbo = client.db(database); // Connects to the database
   const drivers = dbo.collection("BCCRidesDrivers"); // Get the collection to query
   const id = req.params.id;
   try {
     const result = await drivers.deleteOne({ _id: id});
     res.send(result);
   } catch (e) {
     console.log(e);
     res.status(500).send("Error deleting driver by name");
   }
 })

 //Passengers
 app.get('/' + passengerEndpoint, async (req, res) => {
    await client.connect();
   console.log("testing " + passengerEndpoint + " endpoint");
   var dbo = client.db(database); // Connects to the database
   const passengers = dbo.collection("BCCRidesPassengers"); // Get the collection to query
   const result = await passengers.find({}).toArray(); // MongoDB query
   console.log(result);
   res.send(result); // Send result as necessary
 });
 
 app.post("/" + passengerEndpoint, async (req, res) => {
    await client.connect();
   console.log("Create new passenger");
   const body = req.body;
   var dbo = client.db(database); // Connects to the database
   const passengers = dbo.collection("BCCRidesPassengers"); // Get the collection to query
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

 app.get("/" + passengerEndpoint + "/:id", async (req, res) => {
    await client.connect();
   console.log("Get passengers by id");
   var id = req.params.id;
   var dbo = client.db(database); // Connects to the database
   const passengers = dbo.collection("BCCRidesPassengers"); // Get the collection to query
   const result = await passengers.find({_id: id}).toArray();
   res.send(result);
 });

 app.put("/" + passengerEndpoint + "/:id", async (req, res) => {
    await client.connect();
   console.log("Update passenger by ID");
   var id = req.params.id;
   const body = req.body;
   var dbo = client.db(database);
   const passengers = dbo.collection("BCCRidesPassengers");
   try {
     const result = await passengers.updateOne(
       { _id: id },
       { $set: body }
     );
     res.send(result);
   } catch (e) {
     console.log(e);
     res.status(500).send("Error updating passenger by ID");
   }
 });
 
 app.delete("/" + passengerEndpoint + '/:id', async (req, res) =>{
   console.log("Delete passenger");
   var dbo = client.db(database); // Connects to the database
   const passengers = dbo.collection("BCCRidesPassengers"); // Get the collection to query
   const id = req.params.id;
   try {
     const result = await passengers.deleteOne({ _id: id});
     res.send(result);
   } catch (e) {
     console.log(e);
     res.status(500).send("Error deleting passenger by name");
   }
 })

// Events
 app.get("/" + eventsEndpoint, async (req, res) => {
    await client.connect();
  console.log("Get all events");
  var dbo = client.db(database);
  const events = dbo.collection("BCCRidesEvents");
  const result = await events.find({}).toArray();
  res.send(result);
});

app.post("/" + eventsEndpoint, async (req, res) => {
    await client.connect();
  console.log("Create new event");
  const body = req.body;
  var dbo = client.db(database);
  const events = dbo.collection("BCCRidesEvents");
  var response = "Failed";
  try{
    response = await events.insertOne(body);
  }
  catch (e){
    console.log(e);
    response = e;
  };

  res.send(response);
});

// Accounts
app.get('/' + accountEndpoint, async (req, res) => {
    await client.connect();
    console.log("testing");
    var dbo = client.db(database); //Connects to the database
    const account = dbo.collection("BCCRidesAccount"); //Get the collection to query
    const result = await account.find({}).toArray(); //MongoDB query
    console.log(result);
    res.send(result);//Send result as necessary
});

app.post("/" + accountEndpoint, async (req, res) => {
    await client.connect();
  console.log("Create new account");
  const body = req.body;
  var dbo = client.db(database);
  const events = dbo.collection("BCCRidesAccounts");
  var response = "Failed";
  try{
    response = await events.insertOne(body);
  }
  catch (e){
    console.log(e);
    response = e;
  };

  res.send(response);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

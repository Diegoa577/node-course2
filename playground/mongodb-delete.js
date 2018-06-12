//mongod.exe --dbpath F:\mongo-data
//node playground/mongodb-delete.js
// const MongoClient = require('mongodb').MongoClient;
//desectruturacion
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client)=>{
  if (err) {
    console.log('Unable to connect to MongoDb server');
  }

  console.log('Connected to MongoDb server');
  const db = client.db('TodoApp')
//deleteMany
// db.collection("Todos").deleteMany({text: "Eat lunch"}).then((result) => {
//   console.log(result);
// });

//deleteOne
// db.collection("Todos").deleteOne({text: "Eat lunch"}).then((result) => {
//   console.log(result);
// });

//findOneAndDelete
// db.collection("Todos").findOneAndDelete({completed: false}).then((result) => {
//   console.log(result);
// });

db.collection("Users").deleteMany({name: "Diego"}).then((result) => {
  console.log(result);
});

db.collection("Users").findOneAndDelete({_id:new ObjectID("5b1a017a860f664e64efd21c")}).then((result) => {
  console.log(result);
});

  //client.close();
});

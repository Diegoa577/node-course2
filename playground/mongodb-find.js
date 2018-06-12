//mongod.exe --dbpath F:\mongo-data

// const MongoClient = require('mongodb').MongoClient;
//desectruturacion
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client)=>{
  if (err) {
    console.log('Unable to connect to MongoDb server');
  }

  console.log('Connected to MongoDb server');
  const db = client.db('TodoApp')
//buscar find() muestra todo find({completed:false})
// db.collection("Todos").find({
//   _id:new ObjectID("5b19e0effaa9f02aa78a9ac2")
// }).toArray().then((docs) =>{
//   console.log("Todos");
//   console.log(JSON.stringify(docs, undefined, 2));
// },(err) => {
//   console.log("Unable to fetch todos", err);
// })
//en vez de callback usamos promesa
//contar cauntos hay
// db.collection("Todos").find().count().then((count) =>{
//   console.log(`Todos count: ${count}`);
//   },(err) => {
//   console.log("Unable to fetch todos", err);
// })

db.collection("Users").find({name: "Diego"}).toArray().then((docs) =>{
  console.log("Users");
   console.log(JSON.stringify(docs, undefined, 2));
  },(err) => {
  console.log("Unable to fetch todos", err);
})

  //client.close();
});

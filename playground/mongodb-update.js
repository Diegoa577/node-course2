//mongod.exe --dbpath F:\mongo-data
//node playground/mongodb-update.js
// const MongoClient = require('mongodb').MongoClient;
//desectruturacion
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client)=>{
  if (err) {
    console.log('Unable to connect to MongoDb server');
  }

  console.log('Connected to MongoDb server');
  const db = client.db('TodoApp')
// db.collection("Todos").findOneAndUpdate({
//   _id: new ObjectID("5b1b1b81e4b91a011ef5804e")
// }, {
//   $set: {
//     completed: true
//   }
// },{
//   returnOriginal: false
// }).then((result) =>{
//   console.log(result);
// })

db.collection("Users").findOneAndUpdate({
  _id: 123
}, {
  $set: {
    name: "Diego"
  },
   $inc: { age: +1} 
},{
  returnOriginal: false
}).then((result) =>{
  console.log(result);
})


  //client.close();
});

//mongoosejs.com documentation queries
const {ObjectID} = require ('mongodb');
const { mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {user} = require("./../server/models/user");

// var id = '5b2017ba6f0cfb41500392211';

// if(!ObjectID.isValid(id)){
//   console.log("ID not valid");
// }


// Todo.find({
//   _id: id
// }).then ((todos) =>{
//   console.log('Todos', todos);
// });
//
// //other that id
// Todo.findOne({
//   _id: id
// }).then ((todo) =>{
//   console.log('Todo', todo);
// });

//id
// Todo.findById(id).then ((todo) =>{
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));


//Users
var id = '5b1f0fc04f4d9a0c80dd213c';
user.findById(id).then ((user) =>{
  if(!user){
    return console.log('Id not found');
  }
  console.log('User By Id', user);
}).catch((e) => console.log(e));

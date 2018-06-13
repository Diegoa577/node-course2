//mongoosejs.com documentation queries
const {ObjectID} = require ('mongodb');
const { mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {user} = require("./../server/models/user");

// Todo.remove({}) para eliminar todo no se puede enviar vacio
// Todo.remove({}).then((result) =>{
//   console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove
// Todo.findOneAndRemove({_id: "5b20774ec9ee41c6ea5202b3"}).then((todo) =>{
//   console.log(todo);
// });

Todo.findByIdAndRemove("5b20774ec9ee41c6ea5202b3").then((todo) =>{
  console.log(todo);
});

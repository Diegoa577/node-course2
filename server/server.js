//server
const express = require('express');
const bodyparser = require('body-parser');
const {ObjectID} = require ('mongodb')
var {mongoose} = require("./db/mongoose.js");
var {Todo} = require("./models/todo");
var {user} = require("./models/user");

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.json());

app.post("/todos",(req, res)=>{
  var todo = new Todo ({
    text: req.body.text
  })
todo.save().then((doc)=>{
  res.send(doc);
}, (e) =>{
  res.status(400).send(e);
});
});

app.get('/todos', (req, res)=>{
  Todo.find().then ((todos) =>{
    //best solucion es colocar un object envez de array, para hacer mas felxible al collocar una nueva propidad
    res.send({todos})
  }, (e) =>{
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res)=>{
  //obtiene el id
  var id = req.params.id
  if(!ObjectID.isValid(id)){
    res.status(404).send()
  } else{
    Todo.findById(id).then ((todo) =>{
      if(!todo){
        res.status(404).send();
      } else{
        res.send({todo})
      }
    }, (e) =>{
      res.status(400).send(e);
    });
  }
});
//forma del curso
// app.get('/todos/:id', (req, res)=>{
//   //obtiene el id
//   var id = req.params.id
//   if(!ObjectID.isValid(id)){
//     //previene que se ejecute lo demas
//   return res.status(404).send()
//   }
//     Todo.findById(id).then ((todo) =>{
//       if(!todo){
//       return res.status(404).send();
//       }
//         res.send({todo})
//
//     }).catch((e) =>{
//       res.status(400).send(e);
//     });
// });



app.listen(port, () =>{
  console.log(`Started on port ${port}`);
});


module.exports = {app};

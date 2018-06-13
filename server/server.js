//server
require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyparser = require('body-parser');
const {ObjectID} = require ('mongodb')
var {mongoose} = require("./db/mongoose.js");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");
var {authenticate} = require("./middleware/authenticate");

var app = express();
const port = process.env.PORT;

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

app.delete("/todos/:id", (req, res) =>{
  //obtiene el id
  var id = req.params.id
  if(!ObjectID.isValid(id)){
    //previene que se ejecute lo demas
    return res.status(404).send()
  }
  Todo.findByIdAndRemove(id).then ((todo) =>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo})

  }).catch((e) =>{
    res.status(400).send(e);
  });
});

//path when update resosurces
app.patch("/todos/:id", (req, res) =>{
  var id = req.params.id;
  //propiedades que queremos update
  var body = _.pick(req.body, ["text", "completed"])

  if(!ObjectID.isValid(id)){
    return res.status(404).send()
  }
  //update
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else{
    body.completed = false;
    body.completedAt = null;
  }
  //set update
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) =>{
    res.status(400).send();
  })
})

//user
app.post("/users",(req, res)=>{
  var body = _.pick(req.body, ["email", "password"])
  var user = new User (body);

  user.save().then(()=>{
  return user.generateAuthToken();
  }).then((token)=>{
    res.header("x-auth", token).send(user);
  }).catch((e) =>{
    res.status(400).send(e);
  });
});

//ruta privada en middleware

app.get("/users/me", authenticate, (req,res) =>{
  res.send(req.user);
})

app.listen(port, () =>{
  console.log(`Started on port ${port}`);
});


module.exports = {app};


// var newTodo = new Todo({
//   text: "Cook dinner"
// });

// var newTodo = new Todo({
//   text: "Feed the cat",
//   completed: true,
//   completedAt: 20
// });

// var newTodo = new Todo({
// text:"   Edit this video   "
// });
//
//
// newTodo.save().then((doc) =>{
// console.log("Saved todo", doc);
// }, (e) =>{
//   console.log("Unable to save todo");
// });



var newUser = new user({
text:"   diegoa",
email: "diego@email.com"
});

newUser.save().then((doc) =>{
console.log("Saved todo", doc);
}, (e) =>{
  console.log("Unable to save todo");
});

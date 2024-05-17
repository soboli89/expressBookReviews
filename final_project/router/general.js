const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.get('/users',function (req, res) {
    //Write your code here
      
    res.send(JSON.stringify(users));
});



public_users.post("/register", (req,res) => {
    //Write your code here
    //console.log(req.query.password);
   for(let i=0; i<users.length; i++){
       console.log(req.query.username);
     if (users[i].username === req.query.username){
         // console.log("good");
            return res.send("The user" + (' ') + (req.query.username)+ (' ') + "Already Exists! Login or choose another user id")
    } else {
        users.push({"username":req.query.username,"password":req.query.password}); 
       return res.send("The user" + (' ')+ (req.query.username) + " Has been added!")
 // return res.status(300).json({message: "Yet to be implemented"});*/
}}});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
    
  res.send(JSON.stringify(books));
 // return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    var keys = Object.keys( books );
    const isbn = req.params.isbn;
    for (let i=0; i<keys.length-1; i++){
        if (keys[i] === isbn){
            return res.send (Object.values(books)[i]);
    }
  }
    return res.status(300).json({message: "Yet to be implemented"});
 });

 // Get book details based on author

 
public_users.get('/author/:author',function (req, res) {
  //Write your code here
 
  var keys = Object.keys( books );
  let author = req.params.author; 
  let filtered_books = {};
  for( var i = 0; i < keys.length; i++ ) {
    if ((Object.values(books)[i].author) == author){
       filtered_books[i] = (Object.values(books)[i]);
    }  
  };
  res.send(filtered_books);
});




// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here


  var keys = Object.keys( books );
  let title = req.params.title; 
  let filtered_books = {};
  for( var i = 0; i < keys.length; i++ ) {
    if ((Object.values(books)[i].title) == title){
       filtered_books[i] = (Object.values(books)[i]);
    }  
  };
  res.send(filtered_books);


  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  var keys = Object.keys( books );
    const isbn = req.params.isbn;
    for (let i=0; i<keys.length-1; i++){
        if (keys[i] === isbn){
            return res.send (Object.values(books)[i].reviews);
    }
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

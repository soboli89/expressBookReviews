const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

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

 /*\\
public_users.get('/author/:author',function (req, res) {
  //Write your code here
 /*
  var keys = Object.keys( books );
  console.log(keys);
  const author = req.params.author; 
  res.send(author);
  /*
  console.log(author);
  
  let length = keys.length; 
  
  let filtered_books;
  for( var i = 0; i < length; i++ ) {
    if (books[ keys[ i ] ].author===authorName){
        console.log(author);
       // filtered_books.push (books[ keys[ i ] ]);
    }
     // console.log( books[ keys[ i ] ].author===author);
  };
  //res.send(filtered_books);

*/
 /* let length = keys.length;
  for( var i = 0; i < length; i++ ) {
    
    console.log( books[ keys[ i ] ]);
 };
 const author = req.params.author;
  let filtered_books = books.filter((book) => book.author === author);
  res.send(filtered_books);
  return res.status(300).json({message: "Yet to be implemented"});
});
*/

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

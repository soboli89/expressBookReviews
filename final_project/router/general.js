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


/*

// Get the book list available in the shop NUMBER1
public_users.get('/',function (req, res) {
  //Write your code here
    
  res.send(JSON.stringify(books));
 // return res.status(300).json({message: "Yet to be implemented"});
});
*/
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



// Get the book list available in the shop #10
public_users.get("/", async (req, res) => {
    try {
      const allBooks = await getAllBooks();
      return res.status(200).send(JSON.stringify(allBooks, null, 4));
    } catch (e) {
      res.status(500).send(e);
    }
  });


// Task 11
// Add the code for getting the book details based on ISBN (done in Task 2) using Promise callbacks or async-await with Axios.

function getFromISBN(isbn){
    let book_ = books[isbn];  
    return new Promise((resolve,reject)=>{
      if (book_) {
        resolve(book_);
      }else{
        reject("Unable to find book!");
      }    
    })
  }
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    getFromISBN(isbn).then(
      (bk)=>res.send(JSON.stringify(bk, null, 4)),
      (error) => res.send(error)
    )
   });


// Get all books based on title

/*
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

*/


//NUMBER12


// Get book details based on author
public_users.get("/author/:author", async (req, res) => {
    // get array of matching book objects
    const selectedAuthor = Object.values(await books).filter(
      (book) => book.author === req.params.author
    );
    if (selectedAuthor.length > 0) {
      return res.status(200).send(JSON.stringify(matchingBooks, null, 4));
    } else {
      return res.status(404).json({ message: "No books by that author." });
    }
  });
  



//NUMBER13

public_users.get("/title/:title", async (req, res) => {
    const selectedTitle = Object.values(await books).filter(
      (book) => book.title === req.params.title )[0];
    if (selectedTitle) {
      return res.status(200).json(matchingTitle);
    } else {
      return res.status(404).json({ message: "Book with this title not found." });
    }
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

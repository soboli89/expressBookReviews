const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const JWT_SECRET= "Secret";

let users = [
    {
        username: "Vik",
        password: "1989"
    }
];


const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
const userMatches = users.filter((user) => user.username === username);
return userMatches.length > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
const matchingUsers = users.filter((user) => user.username === username && user.password === password);
  return matchingUsers.length > 0;

}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  console.log("login: ", req.query);
  const username = req.query.username;
  const password = req.query.password;

  if (!username || !password) {
    return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
            accessToken,username
        }
        const username2 = req.session.authorization.username;
  console.log(username2);
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({message: "Invalid Login. Check username and password"});
    }








  /*
   const {username, pwd} = req.body;
    if(username==="username" && pwd ==="password"){
        return res.json({
            token: jwt.JsonWebTokenError.sign({user: "username"}, JWT_SECRET),
        });
    }
    return res
        .status(401)
        .json({message: "Invalid username and/or password"});
 // return res.status(300).json({message: "Yet to be implemented"});*/
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  console.log(isbn);
  const review = req.query.review;
  console.log(review);
  const username = req.session.authorization.username;
  console.log(username);
 
  console.log("add review: ", req.params, req.query, req.session);
  if (books[isbn]) {
      let book = books[isbn];
      book.reviews[username] = review;
      return res.status(200).send("Review successfully added");
  }
  else {
      return res.status(404).json({message: `ISBN ${isbn} not found`});
  }
 // return res.status(300).json({message: "Yet to be implemented"});
});


// delete a review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const user = req.session.authorization.username;
    console.log ("user= "+user);
    const isbn = req.params.isbn;
    if (!books[isbn]) {
      res.status(400).json({ message: "invalid ISBN." });
    } else if (!books[isbn].reviews[user]) {
      res
        .status(400)
        .json({ message: `${user} hasn't submitted a review for this book.` });
    } else {
      delete books[isbn].reviews[user];
      res.status(200).json({ message: "Book review deleted." });
    }
  });







module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

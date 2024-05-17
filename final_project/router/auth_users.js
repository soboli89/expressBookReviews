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
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
   const {username, pwd} = req.body;
    if(username==="username" && pwd ==="password"){
        return res.json({
            token: jwt.JsonWebTokenError.sign({user: "username"}, JWT_SECRET),
        });
    }
    return res
        .status(401)
        .json({message: "Invalid username and/or password"});
 // return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

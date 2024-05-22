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
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

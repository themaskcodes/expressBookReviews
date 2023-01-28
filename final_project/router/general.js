const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const user = req.body.user;
    if (!user) {
        return res.status(404).json({message: "Body Empty"});
    }
    let accessToken = jwt.sign({
        data: user
      }, 'access', { expiresIn: 60 * 60 });
      req.session.authorization = {
        accessToken
    }
    return res.status(200).send("User successfully logged in");
});

// Get the book list available in the shop
public_users.get('/',(req, res)=>{
  //Write your code here
  res.send(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn",(req,res)=>{
    const isbn = req.params.isbn;
    let filtered_books = books.filter((book) => book.isbn === isbn);
    res.send(filtered_books);
});
  
// Get book details based on author
public_users.get("/author/:author",(req,res)=>{
    const author = req.params.author;
    let filtered_books = books.filter((book) => book.author === author);
    res.send(filtered_books);
});

// Get all books based on title
public_users.get("/title/:title",(req,res)=>{
    const title = req.params.title;
    let filtered_books = books.filter((book) => book.title === title);
    res.send(filtered_books);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const review = req.params.review;
    let filtered_books = books.filter((book) => book.review === review);
    res.send(filtered_books);
});

module.exports.general = public_users;

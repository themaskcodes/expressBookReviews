const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret_key';

// parse application/x-www-form-urlencoded
public_users.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
public_users.use(bodyParser.json())

public_users.get('/register', (req, res) => {
  const newUser = req.body;
  // save newUser to database
  // ...

  // generate a JWT for the newly registered user
  const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '24h' });

  res.json({ message: 'User registered successfully'});
});

public_user.post("/review",(req,res)=>{
    books.push({"author":req.query.author,"title":req.query.title,"isbn":req.query.isbn});
    res.send("The new review" + (' ')+ (req.query.author) + " Has been added!")
});


public_user.delete("/:email", (req, res) => {
    const email = req.params.email;
    users = users.filter((user) => user.email != email);
    res.send(`User with the email  ${email} deleted.`);
  });

public_user.post('/login', (req, res) => {
    const { username, password } = req.body;
    // verify username and password against database
    // ...
  
    // if login is successful, generate a JWT
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });

    router.delete("/:email", (req, res) => {
        const email = req.params.email;
        users = users.filter((user) => user.email != email);
        res.send(`User with the email  ${email} deleted.`);
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

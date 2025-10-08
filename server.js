/*
    * server.js
    *
    * Homework 1
    * 
    * 10/06/2025
    * 
    * Antonio De la Merced
*/

//frameworks and resources
const express = require("express");
const app = express();
const PORT = 3000;


//routing
app.get("/", (req, res) => {
    const currentDate = new Date();
    res.send(`<h1>Homework1 Shopping list</h1><p>${currentDate}</p>`);
});

app.get('/about', (req, res) => {
  res.send(`<h1>About Homework1</h1><p>Created by: Antonio De la Merced</p><p>Term: Fall 2025</p>
  `);
});
//start the server
app.listen(PORT, () => {
    console.log("server is running")
});
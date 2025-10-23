/*
    * server.js
    *
    * Homework 3
    * 
    * 10/21/2025
    * 
    * Antonio De la Merced
*/

//frameworks and resources
const express = require("express");
const app = express();
const PORT = 3000;
const logger = require('./middleware/logger');
const sanitizeHtml = require('./middleware/sanitize');

//json middleware
app.use(express.json());
app.use(logger);


//routing
app.get("/", (req, res) => {
    const currentDate = new Date();
    res.send(`<h1>Homework 3 Shopping list - Middleware /h1><p>${currentDate}</p>`);
});

app.get("/", (req, res) => {
    const userInput = "<h2>This is <a href='http://www.eek.com'>potentially <script>dangerous</script> text</h2>";
    const cleanInput = sanitizeHtml(userInput);

    console.log("The clean input is: ",cleanInput);
    res.send("<h1>Welcome to Another CS 233W Session!</h1>");
});

app.use((theError, request, response, next) => {
    console.error("[ERROR]" + theError.message)
    const theStatus = theError.status || 500;
    response.status(theStatus).json({issue: "So sorry, we detected an error" +
        theError.message });
})

const lists = require('./routes/lists')
app.use('/lists', lists);


app.get('/about', (req, res) => {
  res.send(`<h1>About Homework3</h1><p>Created by: Antonio De la Merced</p><p>Term: Fall 2025</p>
  `);
});
//start the server
app.listen(PORT, () => {
    console.log("server is running")
});
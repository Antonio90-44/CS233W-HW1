/*
    * server.js
    *
    * Homework 5
    * 
    * 11/01/2025
    * 
    * Antonio De la Merced
*/

//frameworks and resources
const express = require("express");
const app = express();
const PORT = 3000;
const logger = require('./middleware/logger');
const { body, validationResult } = require("express-validator");
const sanitizeHtml = require('./middleware/sanitize');
const lists = require('./routes/lists');
const listItems = require('./data/data.js');

const path = require("path");
//json middleware
app.use(express.json());
app.use(logger);

//ejs
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));

//routing
app.get("/", (req, res) => {
    const currentDate = new Date();
    res.render("index", { title: "Homework 5 - Shopping List", currentDate });
});
//add item 

app.get("/addItem", (req, res) => {
res.render("addItem", { title: "Add New Item", errors: []});
  });
  app.post("/addItem",
  body("itemName").notEmpty().withMessage("Item name is required."),
  body("section").notEmpty().withMessage("Section is required."),
  body("coupon").notEmpty().withMessage("Coupon selection is required."),
  (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.render("addItem", { 
              title: "Add Item", 
              errors: errors.array() 
          });
      }

      const newId = listItems.length > 0 ? listItems[listItems.length - 1].id + 1 : 1;

      const newItem = {
          id: newId,
          itemName: req.body.itemName,
          section: req.body.section,
          coupon: req.body.coupon === "true"
      };

      listItems.push(newItem);

      res.redirect("/");
  }
);

//delete item 
app.get("/deleteItem", (req, res) => {
    res.render("deleteItem", { title: "Delete Item", listItems,  errors: [] });
  });

app.post("/deleteItem",
  body("itemId").notEmpty().withMessage("You must select an item."),
  (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.render("deleteItem", { title: "Delete Item", listItems, errors: errors.array() });
      }

      const deleteId = parseInt(req.body.itemId);
      const deleteIndex = listItems.findIndex(item => item.id === deleteId);
      if (deleteIndex !== -1) {
          listItems.splice(deleteIndex, 1);
      }

      res.redirect("/");
  }
);
app.get('/about', (req, res) => {
    res.send(`<h1>About Homework4</h1><p>Created by: Antonio De la Merced</p><p>Term: Fall 2025</p>`);
  });

app.use("/lists", lists);

app.get("/sanitize", (req, res) => {
    const userInput = "<h2>This is <a href='http://www.eek.com'>potentially <script>dangerous</script> text</h2>";
    const cleanInput = sanitizeHtml(userInput);

    console.log("The clean input is: ",cleanInput);
    res.send("<h1>Welcome to Another CS 233W Session!</h1>");
});

app.use((theError, request, response, next) => {
    console.error("[ERROR] " + theError.message);
    const theStatus = theError.status || 500;
    response.status(theStatus).json({issue: "So sorry, we detected an error: " + theError.message });
});

//start the server
app.listen(PORT, () => {
    console.log("server is running")
});
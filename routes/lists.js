// List.js
// Antonio De la Merced

const express = require('express');
const router = express.Router();
let listItems = require('../data/data.js');


router.get("/", (req, res) => {
  res.render("list", { title: "All Items",listItems });
});


router.get("/search", (req, res) => {
  const search = req.query.item;
  if (!search) {
    return res.status(400).json({ error: "Missing query param 'item'" });
  }


  res.render("list", { title: `Search requested for "${search}"`,listItems });
});


router.get("/item/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = listItems.find(i => i.id === id);

  if (item) {
    res.render("item", { title: item.itemName,item });
  } else {
    res.status(404).send("<h1>Item Not Found</h1>");
  }
});


router.post("/add/item", express.json(), (req, res) => {
  const { itemName, section, coupon } = req.body;
  if (!itemName || !section) {
    return res.status(400).json({ error: "itemName and section are required" });
  }

  const newItem = { 
    id: listItems.length + 1,  itemName, section, coupon: coupon || false };

  listItems.push(newItem);
  res.status(201).json(newItem);
});

module.exports = router;

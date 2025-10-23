//List.js
//Antonio De la Merced

const express = require('express');
const router = express.Router();
let listItems = require('../data/data');


router.get("/", (req, res) => {
  const section = req.query.section;
  if (section) {
    res.send(`<h1>Section: ${section}</h1>`);
  } else {
    res.send("<h1>All Items</h1>");
  }
});


router.get("/search", (req, res) => {
  const search = req.query.item;
  if (!search) {
    return res.status(400).json({ error: "Missing query param 'item'" });
  }
  res.send(`<h1>Search for item: ${search}</h1>`);
});


router.get("/item/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = listItems.find(i => i.id === id);
  if (item) {
    res.send(`<h1>${item.itemName} (${item.section})</h1>`);
  } else {
    res.status(404).send("<h1>Item Not Found</h1>");
  }
});


router.post("/add/item", express.json(), (req, res) => {
  const { itemName, section, coupon } = req.body;
  if (!itemName || !section) {
    return res.status(400).json({ error: "itemName required" });
  }
  const newItem = { id: listItems.length + 1, itemName, section, coupon: coupon || false };
  listItems.push(newItem);
  res.status(201).json(newItem);
});

module.exports = router;

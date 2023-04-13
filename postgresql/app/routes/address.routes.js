module.exports = app => {
    const addresses = require("../controllers/address.controller.js");
  
    var router = require("express").Router();
  
    // Create a new address
    router.post("/", addresses.create);
  
    // Retrieve all addresses
    router.get("/", addresses.findAll);
  
    // Retrieve a single address with id
    router.get("/:id", addresses.findOne);
  
    // Update an address with id
    router.put("/:id", addresses.update);
  
    // Delete an address with id
    router.delete("/:id", addresses.delete);
  
    app.use('/api/addresses', router);
  };
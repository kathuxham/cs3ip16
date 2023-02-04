module.exports = app => {
    const addresses = require("../controllers/address.controller.js");
  
    var router = require("express").Router();
  
    // Create a new individual
    // router.post("/", individuals.create);
  
    // Retrieve all individuals
    router.get("/", addresses.findAll);
  
    // Retrieve a single individual with id
    router.get("/:id", addresses.findOne);
  
    // Update an individual with id
    router.put("/:id", addresses.update);
  
    // Delete an individual with id
    // router.delete("/:id", individuals.delete);
  
    app.use('/api/addresses', router);
  };
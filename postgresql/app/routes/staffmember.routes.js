module.exports = app => {
    const staffMembers = require("../controllers/staffmembers.controller.js");
  
    var router = require("express").Router();
  
    // Create a new individual
    // router.post("/", individuals.create);
  
    // Retrieve all individuals
    router.get("/", individuals.findAll);
  
    // Retrieve a single individual with id
    router.get("/:id", individuals.findOne);
  
    // Update an individual with id
    router.put("/:id", individuals.update);
  
    // Delete an individual with id
    // router.delete("/:id", individuals.delete);
  
    app.use('/api/individuals', router);
  };
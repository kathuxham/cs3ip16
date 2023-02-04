module.exports = app => {
    const staffMembers = require("../controllers/staffmember.controller.js");
  
    var router = require("express").Router();
  
    // Create a new individual
    // router.post("/", individuals.create);
  
    // Retrieve all individuals
    router.get("/", staffMembers.findAll);
  
    // Retrieve a single individual with id
    router.get("/:id", staffMembers.findOne);
  
    // Update an individual with id
    router.put("/:id", staffMembers.update);
  
    // Delete an individual with id
    // router.delete("/:id", individuals.delete);
  
    app.use('/api/staffMembers', router);
  };
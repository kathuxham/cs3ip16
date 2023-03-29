module.exports = app => {
    const emergencycontacts = require("../controllers/emergencycontact.controller.js");
  
    var router = require("express").Router();
  
    // Create a new individual
    // router.post("/", individuals.create);
  
    // Retrieve all individuals
    router.get("/", emergencycontacts.findAll);
  
    // Retrieve a single individual with id
    router.get("/:id", emergencycontacts.findOne);
  
    // Update an individual with id
    router.put("/:id", emergencycontacts.update);
  
    // Delete an individual with id
    // router.delete("/:id", individuals.delete);
  
    app.use('/api/emergencycontacts', router);
  };
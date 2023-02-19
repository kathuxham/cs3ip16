module.exports = app => {
    const studentpersonaldetails = require("../controllers/studentpersonaldetails.controller.js");
  
    var router = require("express").Router();
  
    // Create a new individual
    // router.post("/", individuals.create);
  
    // Retrieve all individuals
    router.get("/", studentpersonaldetails.findAll);
  
    // Retrieve a single individual with id
    router.get("/:id", studentpersonaldetails.findOne);
  
    // Update an individual with id
    router.put("/:id", studentpersonaldetails.update);
  
    // Delete an individual with id
    // router.delete("/:id", individuals.delete);
  
    app.use('/api/studentpersonaldetails', router);
  };
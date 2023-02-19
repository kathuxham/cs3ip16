module.exports = app => {
    const enrolments = require("../controllers/enrolment.controller.js");
  
    var router = require("express").Router();
  
    // Create a new individual
    // router.post("/", individuals.create);
  
    // Retrieve all individuals
    router.get("/", enrolments.findAll);
  
    // Retrieve a single individual with id
    router.get("/:id", enrolments.findOne);
  
    // Update an individual with id
    router.put("/:id", enrolments.update);
  
    // Delete an individual with id
    // router.delete("/:id", individuals.delete);
  
    app.use('/api/enrolments', router);
  };
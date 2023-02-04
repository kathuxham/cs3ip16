module.exports = app => {
    const assessments = require("../controllers/assessment.controller.js");
  
    var router = require("express").Router();
  
    // Create a new individual
    // router.post("/", assessments.create);
  
    // Retrieve all individuals
    router.get("/", assessments.findAll);
  
    // Retrieve a single individual with id
    router.get("/:id", assessments.findOne);
  
    // Update an individual with id
    router.put("/:id", assessments.update);
  
    // Delete an individual with id
    // router.delete("/:id", assessments.delete);
  
    app.use('/api/assessments', router);
  };
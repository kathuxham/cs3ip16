module.exports = app => {
    const assessmentmarks = require("../controllers/assessmentmarks.controller.js");
  
    var router = require("express").Router();
  
    // Create a new individual
    // router.post("/", assessmentmarks.create);
  
    // Retrieve all individuals
    router.get("/", assessmentmarks.findAll);
  
    // Retrieve a single individual with id
    router.get("/:id", assessmentmarks.findOne);
  
    // Update an individual with id
    router.put("/:id", assessmentmarks.update);
  
    // Delete an individual with id
    // router.delete("/:id", assessmentmarks.delete);
  
    app.use('/api/assessmentmarks', router);
  };
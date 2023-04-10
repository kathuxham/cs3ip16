module.exports = app => {
    const assessmentmarks = require("../controllers/assessmentmarks.controller.js");
  
    var router = require("express").Router();
  
    // Create a new assessment mark
    router.post("/", assessmentmarks.create);
  
    // Retrieve all assessment marks
    router.get("/", assessmentmarks.findAll);
  
    // Retrieve a single assessment mark with id
    router.get("/:id", assessmentmarks.findOne);
  
    // Update an assessment mark with id
    router.put("/:id", assessmentmarks.update);
  
    // Delete an assessment mark with id
    router.delete("/:id", assessmentmarks.delete);
  
    app.use('/api/assessmentmarks', router);
  };
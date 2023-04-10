module.exports = app => {
    const assessments = require("../controllers/assessment.controller.js");
  
    var router = require("express").Router();
  
    // Create a new assessment
    router.post("/", assessments.create);
  
    // Retrieve all assessments
    router.get("/", assessments.findAll);
  
    // Retrieve a single assessment with id
    router.get("/:id", assessments.findOne);
  
    // Update an assessment with id
    router.put("/:id", assessments.update);
  
    // Delete an assessment with id
    router.delete("/:id", assessments.delete);
  
    app.use('/api/assessments', router);
  };
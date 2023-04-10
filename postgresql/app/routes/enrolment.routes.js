module.exports = app => {
    const enrolments = require("../controllers/enrolment.controller.js");
  
    var router = require("express").Router();
  
    // Create a new enrolment
    router.post("/", enrolments.create);
  
    // Retrieve all enrolments
    router.get("/", enrolments.findAll);
  
    // Retrieve a single enrolment with id
    router.get("/:id", enrolments.findOne);
  
    // Update an enrolment with id
    router.put("/:id", enrolments.update);
  
    // Delete an enrolment with id
    router.delete("/:id", enrolments.delete);
  
    app.use('/api/enrolments', router);
  };
module.exports = app => {
    const students = require("../controllers/student.controller.js");
  
    var router = require("express").Router();
  
    // Create a new individual
    // router.post("/", individuals.create);
  
    // Retrieve all individuals
    router.get("/", students.findAll);
  
    // Retrieve a single individual with id
    router.get("/:id", students.findOne);
  
    // Update an individual with id
    router.put("/:id", students.update);
  
    // Delete an individual with id
    // router.delete("/:id", individuals.delete);
  
    app.use('/api/students', router);
  };
module.exports = app => {
    const studentpersonaldetails = require("../controllers/studentpersonaldetails.controller.js");
  
    var router = require("express").Router();
  
    // Create a new student personal details file
    router.post("/", studentpersonaldetails.create);
  
    // Retrieve all student personal details files
    router.get("/", studentpersonaldetails.findAll);
  
    // Retrieve a single student personal details file with id
    router.get("/:id", studentpersonaldetails.findOne);
  
    // Update a student personal details file with id
    router.put("/:id", studentpersonaldetails.update);
  
    // Delete a student personal details file with id
    router.delete("/:id", studentpersonaldetails.delete);
  
    app.use('/api/studentpersonaldetails', router);
  };
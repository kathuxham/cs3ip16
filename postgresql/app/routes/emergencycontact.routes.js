module.exports = app => {
    const emergencycontacts = require("../controllers/emergencycontact.controller.js");
  
    var router = require("express").Router();
  
    // Create a new emergency contact
    router.post("/", emergencycontacts.create);
  
    // Retrieve all emergency contacts
    router.get("/", emergencycontacts.findAll);
  
    // Retrieve a single emergency contact with id
    router.get("/:id", emergencycontacts.findOne);
  
    // Update an emergency contact with id
    router.put("/:id", emergencycontacts.update);
  
    // Delete an emergency contact with id
    router.delete("/:id", emergencycontacts.delete);
  
    app.use('/api/emergencycontacts', router);
  };
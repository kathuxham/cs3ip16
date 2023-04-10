module.exports = app => {
    const contactpreferences = require("../controllers/contactpreferences.controller.js");
  
    var router = require("express").Router();
  
    // Create a new contact preference
    router.post("/", contactpreferences.create);
  
    // Retrieve all contact preferences
    router.get("/", contactpreferences.findAll);
  
    // Retrieve contact preferences with id
    router.get("/:id", contactpreferences.findOne);
  
    // Update contact preferences with id
    router.put("/:id", contactpreferences.update);
  
    // Delete a contact preference with id
    router.delete("/:id", contactpreferences.delete);
  
    app.use('/api/contactpreferences', router);
  };
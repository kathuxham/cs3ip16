module.exports = app => {
    const staffMembers = require("../controllers/staffmember.controller.js");
  
    var router = require("express").Router();
  
    // Create a new staff member
    router.post("/", staffMembers.create);
  
    // Retrieve all staff members
    router.get("/", staffMembers.findAll);
  
    // Retrieve a single staff member with id
    router.get("/:id", staffMembers.findOne);
  
    // Update a staff member with id
    router.put("/:id", staffMembers.update);
  
    // Delete a staff member with id
    router.delete("/:id", staffMembers.delete);
  
    app.use('/api/staffMembers', router);
  };
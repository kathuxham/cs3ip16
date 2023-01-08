module.exports = app => {
    const individuals = require("../controllers/individual.controller.js");
  
    var router = require("express").Router();
  
    // Create a new individual
    router.post("/", individuals.create);
  
    // Retrieve all individuals
    router.get("/", individuals.findAll);
  
    // Retrieve all published individuals
    // router.get("/published", individuals.findAllPublished);
  
    // Retrieve a single individual with id
    router.get("/:id", individuals.findOne);
  
    // Update an individual with id
    router.put("/:id", individuals.update);
  
    // Delete an individual with id
    router.delete("/:id", individuals.delete);
  
    // Create a new individual
    router.delete("/", individuals.deleteAll);
  
    app.use('/api/individuals', router);
  };
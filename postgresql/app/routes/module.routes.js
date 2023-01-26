module.exports = app => {
    const modules = require("../controllers/module.controller.js");
  
    var router = require("express").Router();
  
    // Create a new individual
    // router.post("/", modules.create);
  
    // Retrieve all individuals
    router.get("/", modules.findAll);
  
    // Retrieve a single individual with id
    router.get("/:id", modules.findOne);
  
    // Update an individual with id
    router.put("/:id", modules.update);
  
    // Delete an individual with id
    // router.delete("/:id", individuals.delete);
  
    app.use('/api/modules', router);
  };
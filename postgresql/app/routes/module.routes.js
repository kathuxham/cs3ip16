module.exports = app => {
    const modules = require("../controllers/module.controller.js");
  
    var router = require("express").Router();
  
    // Create a new module
    router.post("/", modules.create);
  
    // Retrieve all modules
    router.get("/", modules.findAll);
  
    // Retrieve a single module with id
    router.get("/:id", modules.findOne);
  
    // Update a module with id
    router.put("/:id", modules.update);
  
    // Delete a module with id
    router.delete("/:id", modules.delete);
  
    app.use('/api/modules', router);
  };
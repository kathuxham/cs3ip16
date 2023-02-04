const db = require("../models");
const Module = db.modules;
const Op = db.Sequelize.Op;

// Create and Save a new module
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.firstName) {
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // }
  
    // Create a module
    const module = {
        moduleCode: req.body.moduleCode,
        moduleTitle: req.body.moduleTitle,
        moduleLevel: req.body.moduleLevel,
        moduleLink: req.body.moduleLink,
        numberOfCredits: req.body.numberOfCredits,
        termsTaught: req.body.termsTaught,
        currentAsOf: req.body.currentAsOf,
        contactHours: req.body.contactHours,
    };
  
    // Save module in the database
    Module.create(module)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the module."
        });
      });
  };

// Retrieve all modules from the database.
exports.findAll = (req, res) => {
    const moduleTitle = req.query.moduleTitle;
    var condition = moduleTitle ? { moduleTitle: { [Op.iLike]: `%${moduleTitle}%` } } : null;
  
    Module.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving modules."
        });
      });
  };

// Find a single module with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Module.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find module with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving module with id=" + id
      });
    });
};

// Update a module by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Module.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Module was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update module with id=${id}. Maybe module was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating module with id=" + id
      });
    });
};

// Delete an module with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Module.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Module was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete module with id=${id}. Maybe module was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete module with id=" + id
      });
    });
};

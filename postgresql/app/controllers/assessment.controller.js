const db = require("../models");
const Assessment = db.assessments;
const Op = db.Sequelize.Op;

// Create and Save a new assessment
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.firstName) {
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // }
  
    // Create an assessment
    const assessment = {
        assessmentCode: req.body.assessmentCode,
        assessmentDetail: req.body.assessmentDetail,
        assessmentType: req.body.assessmentType,
        assessmentWeight: req.body.assessmentWeight,
    };
  
    // Save assessment in the database
    Assessment.create(assessment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the individual."
        });
      });
  };

// Retrieve all assessments from the database.
exports.findAll = (req, res) => {
    const moduleId = req.query.moduleId;
    var condition = moduleId ? { moduleId: `${moduleId}` } : null;
  
    Assessment.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving assessments."
        });
      });
  };

// Find a single assessment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Assessment.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find assessment with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving assessment with id=" + id
      });
    });
};

// Update an assessment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Assessment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Assessment was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update assessment with id=${id}. Maybe assessment was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating assessment with id=" + id
      });
    });
};

// Delete an assessment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Assessment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Assessment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete assessment with id=${id}. Maybe assessment was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete assessment with id=" + id
      });
    });
};

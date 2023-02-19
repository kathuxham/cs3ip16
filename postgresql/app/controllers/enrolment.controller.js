const db = require("../models");
const Enrolment = db.enrolmentStatus;
const Op = db.Sequelize.Op;

// Create and Save a new enrolment
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.firstName) {
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // }
  
    // Create an enrolment
    const enrolment = {
      enrolmentComplete: req.body.enrolmentComplete,
      stage1: req.body.stage1,
      stage2: req.body.stage2,
      stage3: req.body.stage3,
      stage4: req.body.stage4,
    };
  
    // Save enrolment in the database
    Enrolment.create(enrolment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the enrolment."
        });
      });
  };

// Retrieve all enrolments from the database.
exports.findAll = (req, res) => {
    const studentId = req.query.studentId;
    var condition = studentId ? { studentId: `${studentId}` } : null;
  
    Enrolment.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving enrolments."
        });
      });
  };

// Find a single enrolment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Enrolment.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find enrolment with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving enrolment with id=" + id
      });
    });
};

// Update an enrolment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Enrolment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Enrolment was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update enrolment with id=${id}. Maybe enrolment was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating student with id=" + id
      });
    });
};

// Delete an enrolment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Enrolment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Enrolment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete enrolment with id=${id}. Maybe enrolment was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete enrolment with id=" + id
      });
    });
};

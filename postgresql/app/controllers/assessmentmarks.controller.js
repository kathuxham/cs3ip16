const db = require("../models");
const AssessmentMark = db.assessmentMarks;
const Op = db.Sequelize.Op;

// Create and Save a new assessment mark
exports.create = (req, res) => {

    // Create an assessment mark
    const assessmentMark = {
        assessmentStatus: req.body.assessmentStatus,
        assessmentMark: req.body.assessmentMark,
        assessmentGrade: req.body.assessmentGrade,
        assessmentState: req.body.assessmentState,
        assessmentDate: req.body.assessmentDate,
        assessmentLevel: req.body.assessmentLevel,
    };
  
    // Save assessment mark in the database
    AssessmentMark.create(assessmentMark)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the assessment mark."
        });
      });
  };

// Retrieve all assessment marks from the database.
exports.findAll = (req, res) => {
    const assessmentId = req.query.assessmentId;
    const studentId = req.query.studentId;
    var condition = assessmentId ? { assessmentId: `${assessmentId}` } 
    : studentId ? { studentId: `${studentId}` }
    : null;
  
    AssessmentMark.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving assessment marks."
        });
      });
  };

// Find a single assessment mark with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  AssessmentMark.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find assessment mark with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving assessment mark with id=" + id
      });
    });
};

// Update an assessment mark by the id in the request
exports.update = (req, res) => {

    // Validate update
    if (typeof req.body.assessmentMark === 'string') {
        res.status(400).send({
        message: "Mark cannot be a string!"
        });
        return;
    }
    const grades = ["A", "B", "C", "D", "E", "F"];
    if (grades.includes(req.body.assessmentGrade)) {
        res.status(400).send({
        message: "Grade is not valid!"
        });
        return;
    }
    if (!req.body.assessmentMark || !req.body.assessmentGrade) {
        res.status(400).send({
        message: "Mark or grade cannot be empty!"
        });
        return;
    }


    const id = req.params.id;

    AssessmentMark.update(req.body, {
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Assessment mark was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update assessment mark with id=${id}. Maybe assessment mark was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating assessment mark with id=" + id
        });
        });
};

// Delete an assessment mark with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  AssessmentMark.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Assessment mark was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete assessment mark with id=${id}. Maybe assessment mark was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete assessment mark with id=" + id
      });
    });
};

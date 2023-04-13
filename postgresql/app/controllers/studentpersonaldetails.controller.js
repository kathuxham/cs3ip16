const db = require("../models");
const StudentPersonalDetails = db.personalDetails;
const Op = db.Sequelize.Op;

// Create and Save a new student personal details file
exports.create = (req, res) => {
    // Create a student personal details file
    const studentPersonalDetails = {
      nationality: req.body.nationality,
      domicile: req.body.domicile,
      countryOfBirth: req.body.countryOfBirth,
      ethnicity: req.body.ethnicity,
      feeStatus: req.body.feeStatus,
      disability: req.body.disability,
      parentalResponsibility: req.body.parentalResponsibility,
    };
  
    // Save student personal details file in the database
    StudentPersonalDetails.create(studentPersonalDetails)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the student personal details file."
        });
      });
  };

// Retrieve all student personal details files from the database.
exports.findAll = (req, res) => {
    const studentId = req.query.studentId;
    var condition = studentId ? { studentId: `${studentId}` } : null;
  
    StudentPersonalDetails.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving student personal details files."
        });
      });
  };

// Find a single student personal details file with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  StudentPersonalDetails.findByPk()
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find student personal details file with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving student personal details file with id=" + id
      });
    });
};

// Update a student personal details file by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  StudentPersonalDetails.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Student personal details file was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update student personal details file with id=${id}. Maybe student personal details file was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating student personal details file with id=" + id
      });
    });
};

// Delete a student personal details file with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  StudentPersonalDetails.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Student personal details file was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete student personal details file with id=${id}. Maybe student personal details file was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete student personal details file with id=" + id
      });
    });
};

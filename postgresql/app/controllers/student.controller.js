const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;

// Create and Save a new student
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.firstName) {
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // }
  
    // Create a student
    const student = {
      studentNumber: req.body.studentNumber,
      studentUsername: req.body.studentUsername,
      programme: req.body.programme,
      qualification: req.body.qualification,
      department: req.body.department,
      startDate: req.body.startDate,
      expectedEndDate: req.body.expectedEndDate,
      status: req.body.status,
    };
  
    // Save student in the database
    Student.create(student)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the student."
        });
      });
  };

// Retrieve all students from the database.
exports.findAll = (req, res) => {
    const studentNumber = req.query.studentNumber;
    var condition = studentNumber ? { studentNumber: { [Op.iLike]: `%${studentNumber}%` } } : null;
  
    Student.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving students."
        });
      });
  };

// Find a single student with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Student.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find student with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving student with id=" + id
      });
    });
};

// Update a student by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Student.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Student was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update student with id=${id}. Maybe student was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating student with id=" + id
      });
    });
};

// Delete a student with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Student.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Student was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete student with id=${id}. Maybe student was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete student with id=" + id
      });
    });
};

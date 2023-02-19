const db = require("../models");
const Individual = db.individuals;
const Op = db.Sequelize.Op;

// Create and Save a new individual
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.firstName) {
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // }
  
    // Create an individual
    const individual = {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      preferredName: req.body.preferredName,
      dateOfBirth: req.body.dateOfBirth,
      pronouns: req.body.pronouns,
      studentOrStaff: req.body.studentOrStaff ? req.body.studentOrStaff : "NA",
      contactPhoneNumber: req.body.contactPhoneNumber,
      homePhoneNumber: req.body.homePhoneNumber,
      mobilePhoneNumber: req.body.mobilePhoneNumber,
      personalEmailAddress: req.body.personalEmailAddress,
      universityEmailAddress: req.body.universityEmailAddress,
    };
  
    // Save individual in the database
    Individual.create(individual)
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

// Retrieve all individuals from the database.
exports.findAll = (req, res) => {
    const firstName = req.query.firstName;
    var condition = firstName ? { firstName: { [Op.iLike]: `%${firstName}%` } } : null;
  
    Individual.findAll({ where: condition})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving individuals."
        });
      });
  };

// Find a single individual with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Individual.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Individual with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Individual with id=" + id
      });
    });
};

// Update an individual by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Individual.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Individual was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Individual with id=${id}. Maybe Individual was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Individual with id=" + id
      });
    });
};

// Delete an individual with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Individual.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Individual was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Individual with id=${id}. Maybe Individual was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Individual with id=" + id
      });
    });
};

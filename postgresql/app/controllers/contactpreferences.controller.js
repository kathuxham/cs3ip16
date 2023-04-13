const db = require("../models");
const ContactPreferences = db.contactPreferences;
const Op = db.Sequelize.Op;

// Create and Save a new contact preference
exports.create = (req, res) => {
    // Create contact preferences
    const contactPreference = {
        textMessages: req.body.textMessages,
        alumniSupporterEmails: req.body.alumniSupporterEmails,
        careerEmails: req.body.careerEmails
    };
  
    // Save contact preferences in the database
    ContactPreferences.create(contactPreference)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating contact preferences."
        });
      });
  };

// Retrieve all contact preferences from the database.
exports.findAll = (req, res) => {
    const studentId = req.query.studentId;
    var condition = studentId ? { studentId: `${studentId}` } : null;
  
    ContactPreferences.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving contact preferences."
        });
      });
  };

// Find contact preferences with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ContactPreferences.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find contact preferences with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving contact preferences with id=" + id
      });
    });
};

// Update contact preferences by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  ContactPreferences.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contact preferences was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update contact preferences with id=${id}. Maybe contact preferences was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating contact preferences with id=" + id
      });
    });
};

// Delete contact preferences with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ContactPreferences.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contact preferences was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete contact preferences with id=${id}. Maybe emergency contact was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete contact preferences with id=" + id
      });
    });
};

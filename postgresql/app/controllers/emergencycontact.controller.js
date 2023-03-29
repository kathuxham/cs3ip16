const db = require("../models");
const EmergencyContact = db.emergencyContact;
const Op = db.Sequelize.Op;

// Create and Save a new emergency contact
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.firstName) {
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // }
  
    // Create an emergency contact
    const contact = {
      fullName: req.body.fullName,
      relationship: req.body.relationship,
      telephoneNumber: req.body.telephoneNumber
    };
  
    // Save emergency contact in the database
    EmergencyContact.create(contact)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the emergency contact."
        });
      });
  };

// Retrieve all emergency contacts from the database.
exports.findAll = (req, res) => {
    const studentId = req.query.studentId;
    var condition = studentId ? { studentId: `${studentId}` } : null;
  
    EmergencyContact.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving emergency contacts."
        });
      });
  };

// Find a single emergency contact with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  EmergencyContact.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find emergency contact with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving emergency contact with id=" + id
      });
    });
};

// Update an emergency contact by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  EmergencyContact.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Emergency contact was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update emergency contact with id=${id}. Maybe emergency contact was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating emergency contact with id=" + id
      });
    });
};

// Delete an emergency contact with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  EmergencyContact.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Emergency contact was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete emergency contact with id=${id}. Maybe emergency contact was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete emergency contact with id=" + id
      });
    });
};

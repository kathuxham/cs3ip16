const db = require("../models");
const Address = db.addresses;
const Op = db.Sequelize.Op;

// Create and Save a new address
exports.create = (req, res) => {
    // Create an address
    const address = {
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        addressLine3: req.body.addressLine3,
        townCity: req.body.townCity,
        region: req.body.region,
        postCode: req.body.postCode,
        country: req.body.country,
    };
  
    // Save address in the database
    Address.create(address)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the address."
        });
      });
  };

// Retrieve all addresses from the database.
exports.findAll = (req, res) => {
    const individualId = req.query.individualId;
    const studentId = req.query.studentId;
    var condition = individualId ? { individualId: `${individualId}` } 
    : studentId ? { studentId: `${studentId}` }
    : null;
  
    Address.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving addresses."
        });
      });
  };

// Find a single address with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Address.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find address with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving address with id=" + id
      });
    });
};

// Update an address by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Address.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Address was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update address with id=${id}. Maybe address was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating address with id=" + id
      });
    });
};

// Delete an address with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Address.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Address was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete address with id=${id}. Maybe address was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete address with id=" + id
      });
    });
};

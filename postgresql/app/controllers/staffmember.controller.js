const db = require("../models");
const StaffMember = db.staffMembers;
const Op = db.Sequelize.Op;

// Create and Save a new staff member
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.firstName) {
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // }
  
    // Create a staff member
    const staffMember = {
      staffNumber: req.body.staffNumber,
      position: req.body.position,
    };
  
    // Save staff member in the database
    StaffMember.create(staffMember)
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

// Retrieve all staff members from the database.
exports.findAll = (req, res) => {
    const staffNumber = req.query.staffNumber;
    var condition = staffNumber ? { staffNumber: { [Op.iLike]: `%${staffNumber}%` } } : null;
  
    StaffMember.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving staff members."
        });
      });
  };

// Find a single staff member with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  StaffMember.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find staff member with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving staff member with id=" + id
      });
    });
};

// Update a staff member by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  StaffMember.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Staff member was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update staff member with id=${id}. Maybe staff member was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating staff member with id=" + id
      });
    });
};

// Delete a staff member with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  StaffMember.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Staff member was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete staff member with id=${id}. Maybe staff member was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete staff member with id=" + id
      });
    });
};

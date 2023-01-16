module.exports = (sequelize, Sequelize) => {
    const EmergencyContact = sequelize.define("emergencyContact", {
      fullName: {
        type: Sequelize.STRING(70)
      },
      relationship: {
        type: Sequelize.STRING(50)
      },
      telephoneNumber: {
        type: Sequelize.STRING(40)
      },
    });
  
    return EmergencyContact;
  };
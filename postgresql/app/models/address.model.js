module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("address", {
      addressLine1: {
        type: Sequelize.STRING(35)
      },
      addressLine2: {
        type: Sequelize.STRING(35)
      },
      addressLine3: {
        type: Sequelize.STRING(35)
      },
      townCity: {
        type: Sequelize.STRING(35)
      },
      region: {
        type: Sequelize.STRING(35)
      },
      postCode: {
        type: Sequelize.STRING(10)
      },
      country: {
        type: Sequelize.STRING(35)
      }
    });
  
    return Address;
  };
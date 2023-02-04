module.exports = (sequelize, Sequelize) => {
    const StudentPersonalDetails = sequelize.define("studentPersonalDetails", {
      nationality: {
        type: Sequelize.STRING(100)
      },
      domicile: {
        type: Sequelize.STRING(100)
      },
      countryOfBirth: {
        type: Sequelize.STRING(100)
      },
      ethnicity: {
        type: Sequelize.STRING(100)
      },
      feeStatus: {
        type: Sequelize.STRING(100)
      },
      disability: {
        type: Sequelize.STRING(100)
      },
      parentalResponsibility: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return StudentPersonalDetails;
  };
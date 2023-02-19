module.exports = (sequelize, Sequelize) => {
    const Assessment = sequelize.define("assessment", {
      assessmentCode: {
        type: Sequelize.STRING(10)
      },
      assessmentDetail: {
        type: Sequelize.STRING(50)
      },
      assessmentType: {
        type: Sequelize.STRING(50)
      },
      assessmentWeight: {
        type: Sequelize.FLOAT
      }
    });
  
    return Assessment;
  };
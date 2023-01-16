module.exports = (sequelize, Sequelize) => {
    const Coursework = sequelize.define("coursework", {
      courseworkCode: {
        type: Sequelize.STRING(10)
      },
      courseworkTitle: {
        type: Sequelize.STRING(100)
      },
      typeOfAssignment: {
        type: Sequelize.STRING(500)
      },
      individualOrGroup: {
        type: Sequelize.STRING(15)
      },
      courseworkWeighting: {
        type: Sequelize.INTEGER
      },
      dateReleased: {
        type: Sequelize.DATE
      },
      dateDue: {
        type: Sequelize.DATE
      },
      dateMarksReleased: {
        type: Sequelize.DATE
      },
    });
  
    return Coursework;
  };
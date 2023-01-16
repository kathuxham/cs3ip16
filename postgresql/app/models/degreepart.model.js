module.exports = (sequelize, Sequelize) => {
    const DegreePart = sequelize.define("degreePart", {
      degreePart: {
        type: Sequelize.INTEGER
      },
      degreeCode: {
        type: Sequelize.STRING(10)
      },
    });
  
    return DegreePart;
  };
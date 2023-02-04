module.exports = (sequelize, Sequelize) => {
    const Module = sequelize.define("module", {
      moduleCode: {
        type: Sequelize.STRING(10)
      },
      moduleTitle: {
        type: Sequelize.STRING
      },
      moduleLevel: {
        type: Sequelize.STRING(5)
      },
      moduleLink: {
        type: Sequelize.STRING
      },
      numberOfCredits: {
        type: Sequelize.INTEGER
      },
      termsTaught: {
        type: Sequelize.STRING
      },
      currentAsOf: {
        type: Sequelize.STRING
      },
      contactHours: {
        type: Sequelize.INTEGER
      },
    });
  
    return Module;
  };
module.exports = (sequelize, Sequelize) => {
    const Module = sequelize.define("module", {
      moduleCode: {
        type: Sequelize.STRING(10)
      },
      moduleTitle: {
        type: Sequelize.STRING(100)
      },
      moduleDescription: {
        type: Sequelize.STRING(500)
      },
      moduleLink: {
        type: Sequelize.STRING(100)
      },
      numberOfCredits: {
        type: Sequelize.INTEGER
      },
      termsTaught: {
        type: Sequelize.STRING(20)
      },
      currentAsOf: {
        type: Sequelize.INTEGER
      },
      contactHours: {
        type: Sequelize.INTEGER
      },
    });
  
    return Module;
  };
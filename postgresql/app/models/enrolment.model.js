module.exports = (sequelize, Sequelize) => {
    const Enrolment = sequelize.define("enrolment", {
      enrolmentComplete: {
        type: Sequelize.BOOLEAN
      },
      stage1: {
        type: Sequelize.BOOLEAN
      },
      stage2: {
        type: Sequelize.BOOLEAN
      },
      stage3: {
        type: Sequelize.BOOLEAN
      },
      stage4: {
        type: Sequelize.BOOLEAN
      },
    });
  
    return Enrolment;
  };
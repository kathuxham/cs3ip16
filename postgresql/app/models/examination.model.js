module.exports = (sequelize, Sequelize) => {
    const Examination = sequelize.define("examination", {
      examCode: {
        type: Sequelize.STRING(10)
      },
      examWeighting: {
        type: Sequelize.INTEGER
      },
      examDate: {
        type: Sequelize.DATE
      },
      examDuration: {
        type: Sequelize.INTEGER
      },
      examRubric: {
        type: Sequelize.STRING(500)
      },
      retake: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Examination;
  };
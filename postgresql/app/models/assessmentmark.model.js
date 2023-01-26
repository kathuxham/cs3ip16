module.exports = (sequelize, Sequelize) => {
    const AssessmentMark = sequelize.define("assessmentMark", {
      assessmentStatus: {
        type: Sequelize.STRING(30)
      },
      assessmentMark: {
        type: Sequelize.FLOAT
      },
      assessmentGrade: {
        type: Sequelize.STRING(10)
      },
      assessmentState: {
        type: Sequelize.STRING(30)
      }
    });
  
    return AssessmentMark;
  };
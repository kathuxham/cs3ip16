module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
      studentNumber: {
        type: Sequelize.INTEGER
      },
      studentId: {
        type: Sequelize.STRING(8)
      },
      course: {
        type: Sequelize.STRING(100)
      },
      courseRep: {
        type: Sequelize.BOOLEAN
      },
      parentalResponsibility: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Student;
  };
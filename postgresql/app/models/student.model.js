module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
      studentNumber: {
        type: Sequelize.INTEGER
      },
      studentUsername: {
        type: Sequelize.STRING(8)
      },
      programme: {
        type: Sequelize.STRING(100)
      },
      qualification: {
        type: Sequelize.STRING(100)
      },
      department: {
        type: Sequelize.STRING(100)
      },
      startDate: {
        type: Sequelize.DATE
      },
      expectedEndDate: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING(100)
      },
    });
  
    return Student;
  };
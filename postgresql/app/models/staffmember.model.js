module.exports = (sequelize, Sequelize) => {
    const StaffMember = sequelize.define("staffMember", {
      staffNumber: {
        type: Sequelize.INTEGER
      },
      position: {
        type: Sequelize.STRING(50)
      }
    });
  
    return StaffMember;
  };
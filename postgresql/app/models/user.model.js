module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      username: {
        type: Sequelize.STRING(30)
      },
      password: {
        type: Sequelize.STRING(30)
      },
      userLastLogin: {
        type: Sequelize.DATE
      },
      userType: {
        type: Sequelize.STRING(50)
      },
      admin: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return User;
  };
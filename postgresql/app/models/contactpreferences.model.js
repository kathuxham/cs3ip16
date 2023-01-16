module.exports = (sequelize, Sequelize) => {
    const ContactPreferences = sequelize.define("contactPreferences", {
      textMessages: {
        type: Sequelize.BOOLEAN
      },
      alumniSupporterEmails: {
        type: Sequelize.BOOLEAN
      },
      careerEmails: {
        type: Sequelize.BOOLEAN
      },
    });
  
    return ContactPreferences;
  };
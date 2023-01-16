module.exports = (sequelize, Sequelize) => {
    const Individual = sequelize.define("individual", {
      firstName: {
        type: Sequelize.STRING(35)
      },
      middleName: {
        type: Sequelize.STRING(35)
      },
      lastName: {
        type: Sequelize.STRING(35)
      },
      preferredName: {
        type: Sequelize.STRING(35)
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      pronouns: {
        type: Sequelize.STRING(10)
      },
      contactPhoneNumber: {
        type: Sequelize.STRING(40)
      },
      homePhoneNumber: {
        type: Sequelize.STRING(40)
      },
      mobilePhoneNumber: {
        type: Sequelize.STRING(40)
      },
      personalEmailAddress: {
        type: Sequelize.STRING(320)
      },
      universityEmailAddress: {
        type: Sequelize.STRING(320)
      },
    });
  
    return Individual;
  };
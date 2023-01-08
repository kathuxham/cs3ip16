module.exports = (sequelize, Sequelize) => {
    const Individual = sequelize.define("individual", {
      firstName: {
        type: Sequelize.STRING
      },
      middleName: {
        type: Sequelize.STRING
      },
      surname: {
        type: Sequelize.STRING
      },
      preferredName: {
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      pronouns: {
        type: Sequelize.STRING
      },
      contactPhoneNumber: {
        type: Sequelize.STRING
      },
      homePhoneNumber: {
        type: Sequelize.STRING
      },
      mobilePhoneNumber: {
        type: Sequelize.STRING
      },
      homeAddress: {
        type: Sequelize.STRING
      },
      personalEmailAddress: {
        type: Sequelize.STRING
      },
      universityEmailAddress: {
        type: Sequelize.STRING
      },
    });
  
    return Individual;
  };
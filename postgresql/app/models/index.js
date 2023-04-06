const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
// Creating a Sequelize instance by passing parameters separately
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.individuals = require("./individual.model.js")(sequelize, Sequelize);
db.staffMembers = require("./staffmember.model.js")(sequelize, Sequelize);
db.students = require("./student.model.js")(sequelize, Sequelize);
db.addresses = require("./address.model.js")(sequelize, Sequelize);
db.enrolmentStatus = require("./enrolment.model.js")(sequelize, Sequelize);
db.emergencyContact = require("./emergencycontact.model.js")(sequelize, Sequelize);
db.contactPreferences = require("./contactpreferences.model.js")(sequelize, Sequelize);
db.personalDetails = require("./studentpersonaldetails.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.modules = require("./module.model.js")(sequelize, Sequelize);
db.assessments = require("./assessment.model.js")(sequelize, Sequelize);
db.assessmentMarks = require("./assessmentmark.model.js")(sequelize, Sequelize);


// individuals to staff and students
db.individuals.hasOne(db.staffMembers, { as: "staffMembers" })
db.staffMembers.belongsTo(db.individuals, {
  foreignKey: "individualId",
  as: "individual"
})
db.individuals.hasOne(db.students, { as: "students" })
db.students.belongsTo(db.individuals, {
  foreignKey: "individualId",
  as: "individual"
})

// staff to students
db.students.belongsToMany(db.staffMembers, {
  through: "academicTutors",
  foreignKey: "studId",
  as: "academicTutee"
})
db.staffMembers.belongsToMany(db.students, {
  through: "academicTutors",
  foreignKey: "staffId",
  as: "academicTutor"
})

// home addresses to individuals
db.individuals.hasOne(db.addresses, { as: "addresses" })
db.addresses.belongsTo(db.individuals, {
  foreignKey: "individualId",
  as: "individual"
})

// term time addresses to students
db.students.hasOne(db.addresses, { as: "addresses" })
db.addresses.belongsTo(db.students, {
  foreignKey: "studentId",
  as: "student"
})

// enrolment to students
db.students.hasOne(db.enrolmentStatus, { as: "enrolmentStatus" })
db.enrolmentStatus.belongsTo(db.students, {
  foreignKey: "studentId",
  as: "student"
})

// emergency contacts to students
db.students.hasMany(db.emergencyContact, { as: "emergencyContact" })
db.emergencyContact.belongsTo(db.students, {
  foreignKey: "studentId",
  as: "student"
})

// contact preferences to students
db.students.hasOne(db.contactPreferences, { as: "contactPreferences" })
db.contactPreferences.belongsTo(db.students, {
  foreignKey: "studentId",
  as: "student"
})

// personal details to students
db.students.hasOne(db.personalDetails, { as: "personalDetails" })
db.personalDetails.belongsTo(db.students, {
  foreignKey: "studentId",
  as: "student"
})

// users to staff
db.staffMembers.hasOne(db.users, { as: "users" })
db.users.belongsTo(db.staffMembers, {
  foreignKey: "staffMemberId",
  as: "staffMember"
})

// modules to staff
db.modules.belongsToMany(db.staffMembers, {
  through: "moduleConvenors",
  foreignKey: "modulesId",
  as: "moduleConvenor"
})
db.staffMembers.belongsToMany(db.modules, {
  through: "moduleConvenors",
  foreignKey: "staffId",
  as: "staffConvenor"
})

// modules to students
db.modules.belongsToMany(db.students, {
  through: "students_modules",
  foreignKey: "modulesId",
  as: "studentMod"
})
db.students.belongsToMany(db.modules, {
  through: "students_modules",
  foreignKey: "studentsId",
  as: "moduleStu"
})

// assessments to modules
db.modules.hasMany(db.assessments, { as: "assessment" })
db.assessments.belongsTo(db.modules, {
  foreignKey: "moduleId",
  as: "module"
})

// assessment mark to assessment
db.assessments.hasMany(db.assessmentMarks, { as: "assessmentMarks" })
db.assessmentMarks.belongsTo(db.assessmentMarks, {
  foreignKey: "assessmentId",
  as: "assessment"
})

// student to assessment marks
db.students.hasMany(db.assessmentMarks, { as: "assessmentMarks" })
db.assessmentMarks.belongsTo(db.students, {
  foreignKey: "studentId",
  as: "student"
})

module.exports = db;
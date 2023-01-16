const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
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
db.users = require("./user.model.js")(sequelize, Sequelize);
db.degreePart = require("./degrepart.model.js")(sequelize, Sequelize);
db.modules = require("./module.model.js")(sequelize, Sequelize);
db.coursework = require("./coursework.model.js")(sequelize, Sequelize);
db.courseworkMarks = require("./courseworkmark.model.js")(sequelize, Sequelize);
db.examinations = require("./examination.model.js")(sequelize, Sequelize);
db.examinationMarks = require("./examinationmarks.model.js")(sequelize, Sequelize);



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

// home addresses to individuals
db.individuals.hasOne(db.addresses, { as: "addresses" })
db.addresses.belongsTo(db.individuals, {
  foreignKey: "individualId",
  as: "individual"
})

// term time addresses to students
db.students.hasOne(db.addresses, { as: "addresses" })
db.addresses.belongsTo(db.students, {
  foreignKey: "studentNumber",
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

// users to staff
db.staffMembers.hasOne(db.users, { as: "users" })
db.users.belongsTo(db.staffMembers, {
  foreignKey: "staffNumber",
  as: "staffMember"
})

// degree parts to students
db.students.hasOne(db.degreePart, { as: "degreePart" })
db.degreePart.belongsTo(db.students, {
  foreignKey: "studentNumber",
  as: "student"
})

// degree parts to modules
db.degreePart.hasMany(db.modules, { as: "modules" })
db.modules.belongsTo(db.degreePart, {
  foreignKey: "degreePart",
  as: "degreePart"
})

// modules to staff
db.modules.belongsToMany(db.staffMembers, {
  through: "staffMember_module",
  foreignKey: "staffNumber",
  as: "staffMember"
})
db.staffMembers.belongsToMany(db.modules, {
  through: "staffMember_module",
  foreignKey: "moduleId",
  as: "module"
})

// modules to students
db.modules.belongsToMany(db.students, {
  through: "student_module",
  foreignKey: "studentNumber",
  as: "student"
})
db.students.belongsToMany(db.modules, {
  through: "student_module",
  foreignKey: "moduleId",
  as: "module"
})

// coursework to modules
db.modules.hasMany(db.coursework, { as: "coursework" })
db.coursework.belongsTo(db.modules, {
  foreignKey: "moduleCode",
  as: "module"
})

// coursework mark to coursework
db.coursework.hasMany(db.courseworkMarks, { as: "courseworkMarks" })
db.courseworkMarks.belongsTo(db.coursework, {
  foreignKey: "courseworkId",
  as: "coursework"
})

// student to coursework mark 
db.students.hasMany(db.courseworkMarks, { as: "courseworkMarks" })
db.courseworkMarks.belongsTo(db.students, {
  foreignKey: "studentId",
  as: "student"
})

// exams to modules
db.modules.hasMany(db.examinations, { as: "examinations" })
db.examinations.belongsTo(db.modules, {
  foreignKey: "moduleCode",
  as: "module"
})

// exam mark to exams
db.examinations.hasMany(db.examinationMarks, { as: "examinationMarks" })
db.examinationMarks.belongsTo(db.examinations, {
  foreignKey: "examinationId",
  as: "examination"
})

// student to exam mark 
db.students.hasMany(db.examinationMarks, { as: "examinationMarks" })
db.examinationMarks.belongsTo(db.students, {
  foreignKey: "studentId",
  as: "student"
})


module.exports = db;
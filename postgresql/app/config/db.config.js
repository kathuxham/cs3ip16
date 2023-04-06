module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "sqltest",
    DB: "degreeSystem",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};
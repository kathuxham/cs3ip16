const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const path = __dirname + '/app/views/';

app.use(express.static(path));

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

require("./app/routes/individual.routes")(app);
require("./app/routes/module.routes")(app);
require("./app/routes/staffmember.routes")(app);
require("./app/routes/student.routes")(app);
require("./app/routes/address.routes")(app);
require("./app/routes/assessment.routes")(app);
require("./app/routes/enrolment.routes")(app);
require("./app/routes/studentpersonaldetails.routes")(app);
require("./app/routes/assessmentmarks.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
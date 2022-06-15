const Employee = require("./router/empRouter");
module.exports = function (app) {
  app.use("/Employee", Employee);
};

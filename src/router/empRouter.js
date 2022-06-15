const router = require("express").Router();

const Employee = require("../controller/empController");
router.post("/createEmployee", Employee.createEmployee);
router.post("/employeeLogin", Employee.employeeLogin);
router.put("/updateEmployee", Employee.updateEmp);
router.get("/getOneEmployee", Employee.getOneEmp);
router.get("/getAllEmployee", Employee.getAllEmp);
router.delete("/deleteEmployee", Employee.deleteEmp);

module.exports = router;
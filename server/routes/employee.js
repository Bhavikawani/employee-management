const express = require("express");
const router = express.Router();
const employee = require("../controllers/employee");

router.post("/", employee.createEmployee);
router.put("/:empId", employee.updateEmployee);
router.delete("/:empId", employee.deleteEmployee);
router.get("/:empId",employee.singleEmployee);
router.get("/", employee.getAllEmployee);

module.exports = router;

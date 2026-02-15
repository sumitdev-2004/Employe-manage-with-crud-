const express = require('express');
sessionAuth = require('../middleware/sessionAuth');
const EmployeController = require('../controller/employe-controller');
const AttendenceController = require('../controller/attendence');
const router = express.Router();

router.get('/Employerdetails', sessionAuth, EmployeController.GetEmploye);
router.post('/Employerdetails/delete', EmployeController.DeleteEmploye);
router.put('/Employerdetails', EmployeController.PutEmploye);
router.post('/Employerdetails', EmployeController.PostEmploye);
router.post("/attendence", AttendenceController.Postattendence);
router.get("/attendence", AttendenceController.Getattendence);
router.delete("/attendence/:id", AttendenceController.DeleteAttendence);
router.get("/atDetails/:email", AttendenceController.atDetails);
router.get("/atDateDetails/:date", AttendenceController.dateDetails);
router.post("/loginEmploye", EmployeController.loginEmploye);
router.post('/sessionDestroy', EmployeController.adminlogout)

module.exports = router;

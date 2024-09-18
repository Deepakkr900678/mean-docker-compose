const express = require("express")
const router = express.Router()

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
} = require("../controllers/Student")

router.post("/createStudent", createStudent)
router.get("/getAllStudents", getAllStudents)
router.get("/getStudentById/:id", getStudentById)
router.patch("/updateStudentById/:id", updateStudentById)
router.delete("/deleteStudentById/:id", deleteStudentById)

module.exports = router

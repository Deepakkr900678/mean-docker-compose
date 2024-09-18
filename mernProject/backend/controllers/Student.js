const Student = require("../models/Student")
require("dotenv").config()

exports.createStudent = async (req, res) => {
  try {
    const { name, email, age, marks } = req.body;

    if (!name || !email || !age || !marks) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingStudent = await Student.findOne({ email });
    
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists with this email",
      });
    }
    const student = new Student({
      name,
      email,
      age,
      marks,
    });
    await student.save();

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create student. Please try again.",
    });
  }
}

exports.getAllStudents = async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10;

  try {
    const totalStudents = await Student.countDocuments();
    const totalPages = Math.ceil(totalStudents / limit); 
    const offset = (page - 1) * limit; 

    const students = await Student.find().skip(offset).limit(limit);

    return res.status(200).json({
      success: true,
      message: "Students retrieved successfully",
      students,
      currentPage: page,
      totalPages,
      totalStudents
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve students. Please try again.",
    });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Student retrieved successfully",
      student,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve student. Please try again.",
    });
  }
};

exports.updateStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const student = await Student.findByIdAndUpdate(id, updates, { new: true });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update student. Please try again.",
    });
  }
};

exports.deleteStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete student. Please try again.",
    });
  }
};





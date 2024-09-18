import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

export default function Student() {
  const [notice, setNotice] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    marks: "",
  });

  useEffect(() => {
    getAllStudents();
  }, []);

  const getAllStudents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/student/getAllStudents");
      setAllStudents(response.data.students);
      setFilteredStudents(response.data.students);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch students. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/student/createStudent",
        formData
      );
      console.log(response.data);
      alert("Student created successfully!");
      setNotice(false);
      setFormData({
        name: "",
        email: "",
        age: "",
        marks: "",
      });
      getAllStudents();
    } catch (error) {
      console.error(error);
      alert("Failed to create student. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/student/deleteStudentById/${id}`);
      alert("Student deleted successfully!");
      getAllStudents();
    } catch (error) {
      console.error(error);
      alert("Failed to delete student. Please try again.");
    }
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.patch(`http://localhost:4000/api/v1/student/updateStudentById/${editId}`, formData);
      console.log(response.data);
      alert("Student information updated successfully!");
      setShowEdit(false);
      getAllStudents();
    } catch (error) {
      console.error(error);
      alert("Failed to update student information. Please try again.");
    }
  };

  useEffect(() => {
    const getData = async () => {
      if (editId) {

        const res = await axios.get(
          `http://localhost:4000/api/v1/student/getStudentById/${editId}`
        );
        console.log(res.data.student, "res")
        setFormData(res.data.student)
      }
    };
    getData();
  }, [editId]);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filtered = allStudents.filter((student) =>
      student.name.toLowerCase().includes(searchQuery)
    );
    setFilteredStudents(filtered);
  };

  return (
    <>
      <div className="p-4  flex flex-col items-center">
        <div className="container flex justify-center w-full  flex-col  border rounded-lg shadow-md p-4">
          <div className="flex gap-2 p-4 self-end">
            <button
              onClick={() => {
                setNotice(!notice);
              }}
              className="bg-blue-400 text-white font-bold p-2 rounded "
            >
              Add New Member
            </button>
          </div>
          <div className="bg-white  p-4 shadow-md border rounded-md h-[60vh] overflow-x-auto">
            <div className="flex justify-between mb-4 ">
              <div>
                <label className="p-2">Search:</label>
                <input
                  type="text"
                  className="border p-1 rounded outline-blue-400"
                  placeholder="search..."
                  onChange={handleSearch}
                />
              </div>
            </div>

            <table className="w-full text-left  ">
              <thead>
                <tr className=" border">
                  <th className="p-2 border-r">SL No</th>
                  <th className="p-2 border-r">Member Name</th>
                  <th className="p-2 border-r">Member Email</th>
                  <th className="p-2 border-r">Member Age</th>
                  <th className="p-2 border-r">Member Marks</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={student._id} className="border">
                    <td className="p-2 border-r">{index + 1}</td>
                    <td className="p-2 border-r">{student.name}</td>
                    <td className="p-2 border-r">{student.email}</td>
                    <td className="p-2 border-r">{student.age}</td>
                    <td className="p-2 border-r">{student.marks}</td>
                    <td className="p-2">
                      <div className="w-20">
                        <div className="flex h-10 ">
                          <button
                            className="border p-2 text-blue-500 hover:bg-gray-100 hover:text-blue-800  w-10"
                            onClick={() => {
                              setEditId(student._id);
                              setShowEdit(true);
                            }}
                          >
                            <AiOutlineEdit size={20} />
                          </button>
                          <button
                            className="border p-2 text-blue-500 hover:bg-gray-100 hover:text-blue-800  w-10"
                            onClick={() => handleDelete(student._id)}
                          >
                            <AiOutlineDelete size={20} />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                className="mx-2 px-4 py-2 border bg-blue-400 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                className={`mx-2 px-4 py-2 border`}
              >
                {1}
              </button>
              <button
                className="mx-2 px-4 py-2 border bg-blue-400 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {notice && (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-50 bg-gray-800">
          <div className="w-1/3 mx-auto p-8 bg-white shadow-lg rounded">
            <div className="font-bold text-xl mb-4">Add New Member</div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Member Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Member Name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Member Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Member Email"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-zinc-700 text-sm font-bold mb-2"
                  htmlFor="age"
                >
                  Member Age
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="age"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter Age"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-zinc-700 text-sm font-bold mb-2"
                  htmlFor="marks"
                >
                  Member Marks
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="marks"
                  type="number"
                  name="marks"
                  value={formData.marks}
                  onChange={handleChange}
                  placeholder="Enter Marks"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setNotice(false)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showEdit && (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-50 bg-gray-800">
          <div className="w-1/3 mx-auto p-8 bg-white shadow-lg rounded">
            <div className="font-bold text-xl mb-4">Edit Student</div>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-zinc-700 text-sm font-bold mb-2"
                  htmlFor="age"
                >
                  Age
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="age"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter Age"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-zinc-700 text-sm font-bold mb-2"
                  htmlFor="marks"
                >
                  Marks
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="marks"
                  type="number"
                  name="marks"
                  value={formData.marks}
                  onChange={handleChange}
                  placeholder="Enter Marks"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowEdit(false)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  )
}

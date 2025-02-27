import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, TextField, Box, Grid } from "@mui/material";
import SidebarAdmin from "./SideBarAdmin";
import { getAllStudent, addStudent, deleteStudent } from "../../Services/StudentService";

function AddStudent() {
  const [students, setStudents] = useState([]); // State to hold student details
  const [formData, setFormData] = useState({
    prn: "",
    name: "",
    email: "",
    phone: "",
  }); // State to hold form input
  const [errors, setErrors] = useState({}); // State for input validation errors

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate on input change
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    if (name === "prn") {
      newErrors.prn = /^\d{12}$/.test(value) ? "" : "PRN must be exactly 12 digits.";
    } else if (name === "name") {
      newErrors.name = value.length > 0 && value.length <= 50 ? "" : "Name cannot exceed 50 characters.";
    } else if (name === "email") {
      newErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email.";
    } else if (name === "phone") {
      newErrors.phone = /^\d{10}$/.test(value) ? "" : "Phone number must be exactly 10 digits.";
    }

    setErrors(newErrors);
  };

  const isFormValid = () => {
    return (
      !errors.prn &&
      !errors.name &&
      !errors.email &&
      !errors.phone &&
      formData.prn &&
      formData.name &&
      formData.email &&
      formData.phone
    );
  };

  const getAllStudents = async () => {
    try {
      const response = await getAllStudent();
      if (response.status === 200) setStudents(response.data);
      else alert("No data found!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  const handleAddStudent = async () => {
    if (isFormValid()) {
      const response = await addStudent(formData);
      setFormData({ prn: "", name: "", email: "", phone: "" }); // Clear the form
      setErrors({});
      getAllStudents(); // Refresh the student list after adding
    } else {
      alert("Please fix the validation errors before adding the student.");
    }
  };

  const handleDeleteStudent = async (id) => {
    const response = await deleteStudent(id);
    alert(response.data);
    getAllStudents(); // Refresh the list after deleting
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <SidebarAdmin />

      <Box
        sx={{
          flexGrow: 1,
          marginLeft: { xs: 0, md: "250px" }, // Offset sidebar on large screens
          padding: 2,
        }}
      >
        {/* Form to Add Student */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: "20px", maxWidth: "800px" }}>
          <TextField
            label="PRN"
            name="prn"
            error={!!errors.prn}
            helperText={errors.prn}
            sx={{ width: "100%", backgroundColor: "#00000", color: "white" }}
            value={formData.prn}
            onChange={handleInputChange}
          />
          <TextField
            label="Name"
            name="name"
            error={!!errors.name}
            helperText={errors.name}
            sx={{ width: "100%", backgroundColor: "#00000", color: "white" }}
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Email"
            name="email"
            error={!!errors.email}
            helperText={errors.email}
            sx={{ width: "100%", backgroundColor: "#00000", color: "white" }}
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Phone"
            name="phone"
            error={!!errors.phone}
            helperText={errors.phone}
            sx={{ width: "100%", backgroundColor: "#00000", color: "white" }}
            value={formData.phone}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#b22222",
              color: "white",
              alignSelf: "flex-start",
            }}
            onClick={handleAddStudent}
          >
            Add Student
          </Button>
        </Box>

        {/* Table to Display Student Details */}
        <TableContainer
          component={Paper}
          sx={{ marginTop: "20px", maxWidth: "800px", overflowX: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#b22222" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>PRN</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Phone</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.prn}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#b22222", color: "white" }}
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default AddStudent;

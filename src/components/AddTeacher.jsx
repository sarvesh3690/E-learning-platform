import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  TextField,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import SidebarAdmin from "./SideBarAdmin";
import { addModuleCoordinator, deleteModuleCoordinator, getAllModuleCoordinator } from "../../Services/ModuleCoordinatorService";

function AddTeacher() {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    if (name === "name") {
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
      !errors.name &&
      !errors.email &&
      !errors.phone &&
      formData.name &&
      formData.email &&
      formData.phone
    );
  };

  const getModuleCoordinators = async () => {
    try {
      const response = await getAllModuleCoordinator();
      if (response.status === 200) {
        setTeachers(response.data);
      } else {
        alert("No data found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getModuleCoordinators();
  }, []);

  const handleAddTeacher = async () => {
    if (isFormValid()) {
      const response = await addModuleCoordinator(formData);
      setFormData({ name: "", email: "", phone: "" });
      setErrors({});
    } else {
      alert("Please fix the validation errors before adding the teacher.");
    }
  };

  const handleDeleteTeacher = async (id) => {
    const response = await deleteModuleCoordinator(id);
    alert(response.data.message);
  };

  return (
    <div className="app">
      <SidebarAdmin />

      <div className="main-content">
        {/* Form to Add Teacher */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: "20px",
            maxWidth: "800px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#fff", textAlign: "center" }}>
            Add Module Coordinator
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                value={formData.name}
                onChange={handleInputChange}
                sx={{
                  "& .MuiInputBase-root": { backgroundColor: "#00000", color: "black" },
                  "& .MuiFormLabel-root": { color: "#aaaaaa" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#black" },
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                value={formData.email}
                onChange={handleInputChange}
                sx={{
                  "& .MuiInputBase-root": { backgroundColor: "#00000", color: "black" },
                  "& .MuiFormLabel-root": { color: "#aaaaaa" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#black" },
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                name="phone"
                error={!!errors.phone}
                helperText={errors.phone}
                fullWidth
                value={formData.phone}
                onChange={handleInputChange}
                sx={{
                  "& .MuiInputBase-root": { backgroundColor: "#00000", color: "black" },
                  "& .MuiFormLabel-root": { color: "#aaaaaa" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#black" },
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#b22222",
                  color: "white",
                  marginBottom: 3,
                  marginTop: 2,
                }}
                onClick={handleAddTeacher}
              >
                Add Teacher
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Table to Display Teacher Details */}
        <TableContainer
          component={Paper}
          sx={{
            marginTop: "20px",
            maxWidth: "800px",
            margin: "auto",
            paddingBottom: "20px",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#b22222" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Phone</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.phone}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#b22222",
                        color: "white",
                        marginRight: "10px",
                      }}
                      onClick={() => handleDeleteTeacher(teacher.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default AddTeacher;

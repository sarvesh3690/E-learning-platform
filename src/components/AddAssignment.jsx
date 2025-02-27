import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Modal,
  TextField,
  Box,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import SidebarCoordinator from "./SideBarCoordinator";
import { getModuleNames } from "../../Services/ModuleServices";
import { CONSTANTS } from "../../Constants/Constants";

function AddAssignment() {
  const [assignments, setAssignments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    deadline: "",
    file: null,
    moduleId: "", // New field
  });

  const [modules, setModules] = useState([]);

  const getAllModuleNames = async () => {
    try {
      const response = await getModuleNames();
      if (response.status === 200) setModules(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch assignments from backend
  const fetchAssignments = async () => {
    try {
      const response = await axios.get(`http://localhost:${CONSTANTS.PORT}/assignment`);
      if (response.status === 200) {
        setAssignments(response.data);
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
    getAllModuleNames();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleAddAssignment = async () => {
    if (!formData.title || !formData.deadline || !formData.file || !formData.moduleId) {
      alert("Please fill in all fields.");
      return;
    }

    const data = new FormData();
    const classWork = JSON.stringify({
      title: formData.title,
      deadline: formData.deadline,
      moduleId: formData.moduleId,
    });

    data.append("file", formData.file);
    data.append("classWork", classWork); // Include moduleId in request

    try {
      const response = await axios.post(
        `http://localhost:${CONSTANTS.PORT}/assignment/addassignment`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        alert("Assignment added successfully!");
        fetchAssignments(); // Refresh the list
        setFormData({ title: "", deadline: "", file: null, moduleId: "" });
        setOpenModal(false);
      }
    } catch (error) {
      console.error("Error adding assignment:", error);
      alert("Failed to add assignment.");
    }
  };

  return (
    <div className="app">
      <SidebarCoordinator />

      <div className="main-content">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Manage Assignments
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#b22222",
            color: "white",
            marginBottom: "16px",
          }}
          onClick={() => setOpenModal(true)}
        >
          Upload Assignment
        </Button>

        <TableContainer component={Paper} sx={{ marginTop: "20px", maxWidth: "100%" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#b22222" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Deadline</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>File</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Module ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>{assignment.id}</TableCell>
                  <TableCell>{assignment.title}</TableCell>
                  <TableCell>{new Date(assignment.deadline).toDateString()}</TableCell>
                  <TableCell>
                    <a
                      href={assignment.pdfFile.split("\\").pop()}
                      download={assignment.pdfFile.split("\\").pop()}
                    >
                      {assignment.pdfFile.split("\\").pop()} {/* Display only the file name */}
                    </a>
                  </TableCell>
                  <TableCell>{assignment.moduleName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: 24,
              padding: "24px",
              width: "90%",
              maxWidth: "400px",
            }}
          >
            <Typography variant="h6" sx={{ color: "black", mb: 2 }}>
              Upload Assignment
            </Typography>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              label="Deadline"
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              select
              label="Module"
              name="moduleId"
              value={formData.moduleId}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: "16px" }}
            >
              {modules.map((value) => (
                <MenuItem key={value.id} value={value.id}>
                  {value.name}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="outlined"
              component="label"
              sx={{ marginBottom: "16px", display: "block" }}
            >
              Upload File (PDF)
              <input type="file" hidden accept=".pdf" onChange={handleFileChange} />
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#b22222",
                color: "white",
                display: "block",
                width: "100%",
              }}
              onClick={handleAddAssignment}
            >
              Add Assignment
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default AddAssignment;

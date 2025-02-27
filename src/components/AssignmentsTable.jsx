import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Paper, Box, Typography, Modal, TextField
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Sidebar from "./SideBar";
import axios from "axios";
import { CONSTANTS } from "../../Constants/Constants";

// Styled File Input
const HiddenInput = styled("input")({
  display: "none",
});

function AssignmentsTable() {
  const [assignments, setAssignments] = useState([]);
  const [uploadedAssignments, setUploadedAssignments] = useState(new Set());
  const [openModal, setOpenModal] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [file, setFile] = useState(null);

  // Get Student ID from Local Storage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const studentId = storedUser?.id || "";

  // Fetch Assignments
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
  }, []);

  // Open Modal for Uploading
  const handleOpenModal = (assignmentId) => {
    setSelectedAssignmentId(assignmentId);
    setOpenModal(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setFile(null);
  };

  // Handle File Selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "assignmentId",
      JSON.stringify({
        assignmentId: selectedAssignmentId,
        studentId: studentId,
      })
    );

    try {
      const response = await axios.post(
        `http://localhost:${CONSTANTS.PORT}/assignment/uploadassignment`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        alert("Assignment uploaded successfully!");
        setUploadedAssignments((prev) => new Set(prev).add(selectedAssignmentId));
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error uploading assignment:", error);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, p: 3, minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Assignments</Typography>

        {/* Assignments Table */}
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#b22222" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Deadline</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Assignment</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Module Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Upload</TableCell>
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
                      {assignment.pdfFile.split("\\").pop()}
                    </a>
                  </TableCell>
                  <TableCell>{assignment.moduleName}</TableCell>
                  <TableCell>
                    {!uploadedAssignments.has(assignment.id) ? (
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#b22222", color: "white" }}
                        onClick={() => handleOpenModal(assignment.id)}
                      >
                        Upload
                      </Button>
                    ) : (
                      <Typography variant="body2" color="green">
                        Uploaded
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Upload Modal */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "white",
              p: 3,
              borderRadius: 2,
              boxShadow: 24,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Upload Assignment
            </Typography>
            <form onSubmit={handleSubmit}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Student ID: <strong>{studentId}</strong>
              </Typography>
              <label htmlFor="file-upload">
                <HiddenInput
                  id="file-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
                <Button
                  variant="outlined"
                  component="span"
                  sx={{ width: "100%", textTransform: "none", mb: 2 }}
                >
                  {file ? file.name : "Select a PDF file"}
                </Button>
              </label>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "#b22222", color: "white" }}
              >
                Upload
              </Button>
            </form>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default AssignmentsTable;

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
    Typography,
} from "@mui/material";
import axios from "axios";
import SidebarCoordinator from "./SideBarCoordinator";
import { getModuleNames } from "../../Services/ModuleServices";
import { getFacultyName } from "../../Services/FacultyService";
import { CONSTANTS } from "../../Constants/Constants";

function AddClassWork() {
    const [assignments, setAssignments] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        topic: "",
        zipFile: null,
        teacherId: 0,
        moduleId: 0,
        date: "",
    });

    const [modules, setModules] = useState([]);
    const [faculty, setFaculty] = useState([]);

    const getAllModuleNames = async () => {
        try {
            const response = await getModuleNames();
            if (response.status === 200) setModules(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getFacultyNames = async () => {
        try {
            const response = await getFacultyName();
            if (response.status === 200) setFaculty(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAssignments = async () => {
        try {
            const response = await axios.get(`http://localhost:${CONSTANTS.PORT}/classwork`);
            if (response.status === 200) {
                setAssignments(response.data);
            }
        } catch (error) {
            console.error("Error fetching classwork:", error);
        }
    };

    useEffect(() => {
        fetchAssignments();
        getAllModuleNames();
        getFacultyNames();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, zipFile: e.target.files[0] });
    };

    const handleAddClassWork = async () => {
        if (!formData.topic || !formData.zipFile || !formData.teacherId || !formData.moduleId || !formData.date) {
            alert("Please fill in all fields.");
            return;
        }

        const data = new FormData();
        const classWorkDetails = JSON.stringify({
            topic: formData.topic,
            teacherId: formData.teacherId,
            moduleId: formData.moduleId,
        });

        data.append("inputfile", formData.zipFile);
        data.append("classWork", classWorkDetails);

        try {
            const response = await axios.post(
                `http://localhost:${CONSTANTS.PORT}/classwork/addclasswork`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Classwork uploaded successfully!");
            fetchAssignments(); // Refresh the table
            setOpenModal(false);
        } catch (error) {
            console.error("Error uploading classwork:", error);
            alert("Failed to upload classwork.");
        }
    };

    return (
        <div className="app">
            <SidebarCoordinator />



            <div className="main-content">
                {/* Upload Button */}
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Manage Classwork
                </Typography>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: "#b22222", color: "white", marginBottom: "16px" }}
                    onClick={() => setOpenModal(true)}
                >
                    Upload Classwork
                </Button>

                {/* Table for Classwork */}
                <TableContainer component={Paper} sx={{ marginTop: "20px", maxWidth: "1000px" }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#b22222" }}>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sr.No</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Topic Name</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Module Name</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Title</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assignments.map((assignment, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{assignment.createdOn}</TableCell>
                                    <TableCell>{assignment.topic}</TableCell>
                                    <TableCell>{assignment.module}</TableCell>
                                    <TableCell>
                                        <a
                                            href={assignment.zipFile.split('\\').pop()}
                                            download={assignment.zipFile.split('\\').pop()}
                                        >
                                            {assignment.zipFile.split('\\').pop()} {/* Display only the file name */}
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Modal for Uploading Classwork */}
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
                            width: "400px",
                        }}
                    >
                        <h2 style={{ color: "black" }}>Upload Classwork</h2>
                        <TextField
                            label="Topic Name"
                            name="topic"
                            value={formData.topic}
                            onChange={handleInputChange}
                            fullWidth
                            sx={{ marginBottom: "16px" }}
                        />
                        {/* Faculty Dropdown */}
                        <TextField
                            select
                            label="Faculty"
                            name="teacherId"
                            value={formData.teacherId}
                            onChange={handleInputChange}
                            fullWidth
                            sx={{ marginBottom: "16px" }}
                        >
                            {faculty.map((value, index) => (
                                <MenuItem value={value.id} key={index}>
                                    {value.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Module Dropdown */}
                        <TextField
                            select
                            label="Module"
                            name="moduleId"
                            value={formData.moduleId}
                            onChange={handleInputChange}
                            fullWidth
                            sx={{ marginBottom: "16px" }}
                        >
                            {modules.map((value, index) => (
                                <MenuItem value={value.id} key={index}>
                                    {value.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Date Input */}
                        <TextField
                            label="Date"
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{ marginBottom: "16px" }}
                        />

                        {/* File Input */}
                        <Button
                            variant="outlined"
                            component="label"
                            sx={{ marginBottom: "16px", display: "block" }}
                        >
                            Upload ZIP File
                            <input type="file" hidden accept=".zip" onChange={handleFileChange} />
                        </Button>

                        {/* Submit Button */}
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#b22222",
                                color: "white",
                                display: "block",
                                width: "100%",
                            }}
                            onClick={handleAddClassWork}
                        >
                            Add Classwork
                        </Button>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default AddClassWork;

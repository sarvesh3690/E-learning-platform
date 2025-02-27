import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Modal, MenuItem, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import SidebarCoordinator from "./SideBarCoordinator";
import { getModuleNames } from "../../Services/ModuleServices";
import { getFacultyName } from "../../Services/FacultyService";
import { addRecording, getRecordings } from "../../Services/RecordingService";

export default function RecordedSession() {
    const [videos, setVideos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modules, setModules] = useState([]);
    const [faculty, setFaculty] = useState([]);

    const [formData, setFormData] = useState({
        link: "",
        topic: "",
        moduleId: 0,
        facultyId: 0,
        date: "",
    });

    const getAllModuleNames = async () => {
        try {
            const response = await getModuleNames();
            if (response.status === 200) setModules(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getFacultyNames = async () => {
        try {
            const response = await getFacultyName();
            if (response.status === 200) setFaculty(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getRecording = async () => {
        try {
            const response = await getRecordings();
            if (response.status === 200) setVideos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllModuleNames();
        getFacultyNames();
        getRecording();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddVideo = async () => {
        const { link, topic, facultyId, moduleId, date } = formData;
        if (!link || !topic || !facultyId || !moduleId || !date) {
            alert("Please fill in all fields.");
            return;
        }

        const response = await addRecording(formData);
        if (response.status === 200) {
            setFormData({ link: "", topic: "", facultyId: "", moduleId: "", date: "" });
            setOpenModal(false);
        }
    };

    return (
        <>
            <div className="app">
                <SidebarCoordinator />

                <div className="main-content">
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Manage Recordings
                    </Typography>

                    <Container maxWidth="xl">
                        <Box
                            sx={{ flexGrow: 1, p: 3, minHeight: "100vh", backgroundColor: "#f4f4f4" }}
                        >
                            {/* Upload Button */}
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#fbc02d",
                                    color: "black",
                                    marginBottom: 2,
                                }}
                                onClick={() => setOpenModal(true)}
                            >
                                Upload Recording
                            </Button>

                            {/* Video Grid */}
                            <Grid container spacing={3}>
                                {videos.map((item, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Box
                                            sx={{
                                                backgroundColor: "#fbc02d",
                                                border: "1px solid #ccc",
                                                borderRadius: 2,
                                                padding: 2,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                height: "auto",
                                            }}
                                        >
                                            {/* Video Topic */}
                                            <h3 style={{ marginBottom: 8 }}>{item.topic}</h3>

                                            {/* Additional Info */}
                                            <p>
                                                Faculty: {item.faculty} | Module: {item.moduleName} | Date: {item.createdOn}
                                            </p>

                                            {/* Video Embed */}
                                            <iframe
                                                src={item.link}
                                                width="100%"
                                                height="200"
                                                style={{
                                                    borderRadius: "8px",
                                                    border: "none",
                                                }}
                                                allowFullScreen
                                            ></iframe>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Container>
                </div>
            </div>

            {/* Modal for Video Upload */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: 24,
                        padding: 4,
                        width: "90%",
                        maxWidth: 400,
                    }}
                >
                    <h2>Upload Recording</h2>

                    <TextField
                        label="Video Link"
                        name="link"
                        value={formData.link}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />

                    <TextField
                        label="Topic"
                        name="topic"
                        value={formData.topic}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />

                    <TextField
                        select
                        label="Faculty"
                        name="facultyId"
                        value={formData.facultyId}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    >
                        {faculty.map((value) => (
                            <MenuItem key={value.id} value={value.id}>
                                {value.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="Module"
                        name="moduleId"
                        value={formData.moduleId}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    >
                        {modules.map((value) => (
                            <MenuItem key={value.id} value={value.id}>
                                {value.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ marginBottom: 2 }}
                    />

                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#fbc02d", color: "black" }}
                        onClick={handleAddVideo}
                    >
                        Add Video
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import Sidebar from "./SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { CONSTANTS } from "../../Constants/Constants";

export default function RecordedSession() {
    const [videos, setVideos] = useState([]); // State to hold video details
    const isSmallScreen = useMediaQuery("(max-width: 600px)");

    const fetchRecording = async () => {
        try {
            const response = await axios.get(`http://localhost:${CONSTANTS.PORT}/recording`);
            if (response.status === 200) {
                setVideos(response.data);
            }
        } catch (error) {
            console.error("Error fetching recordings:", error);
        }
    };

    useEffect(() => {
        fetchRecording();
    }, []);

    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar />

            <Box
                sx={{ flexGrow: 1, p: 3, minHeight: "100vh", backgroundColor: "#f4f4f4" }}
            >
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Recorded Sessions
                </Typography>

                {/* Full-width Video Cards */}
                <Container>
                    {videos.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: "100%", // Full width of the container
                                backgroundColor: "#fbc02d",
                                borderRadius: "8px",
                                padding: 2,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                boxShadow: 3,
                                mb: 3, // Space between cards
                            }}
                        >
                            {/* Topic */}
                            <Typography variant="h6" sx={{ color: "black", mb: 1 }}>
                                {item.topic}
                            </Typography>

                            {/* Additional Info */}
                            <Typography sx={{ color: "black", mb: 2 }}>
                                Faculty: {item.faculty} | Module: {item.moduleName} | Date:{" "}
                                {item.createdOn}
                            </Typography>

                            {/* Video */}
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                }}
                            >
                                <iframe
                                    src={item.link}
                                    width="100%"
                                    height="300"
                                    style={{ border: "none", borderRadius: "8px" }}
                                    allowFullScreen
                                />
                            </Box>
                        </Box>
                    ))}
                </Container>
            </Box>
        </Box>
    );
}

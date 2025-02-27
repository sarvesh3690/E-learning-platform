import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Box, Container, Typography } from "@mui/material";
import Sidebar from "./SideBar";
import axios from "axios";
import { CONSTANTS } from "../../Constants/Constants";

function ClassWork() {
    const [assignments, setAssignments] = useState([]);

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
    }, []);

    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar />

            <Box
                sx={{ flexGrow: 1, p: 3, minHeight: "100vh", backgroundColor: "#f4f4f4" }}
            >
                <Container>
                    <Typography variant="h4" sx={{ mb: 3 }}>
                        Classwork
                    </Typography>

                    <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#b22222" }}>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sr.No</TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Topic Name</TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Module Name</TableCell>
                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Assignment</TableCell>
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
                                                href={assignment.zipFile.split("\\").pop()}
                                                download={assignment.zipFile.split("\\").pop()}
                                            >
                                                {assignment.zipFile.split("\\").pop()} {/* Display only the file name */}
                                            </a>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Box>
        </Box>
    );
}

export default ClassWork;

import React, { useState, useRef } from "react";
import { Box, Button, TextField, Grid, Typography } from "@mui/material";
import Editor from "@monaco-editor/react";
import Sidebar from "./SideBar";

import axios from "axios";

export default function Marie() {
    const [text, setText] = useState("Output");
    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    async function getCode() {
        const code = editorRef.current.getValue();
        try {
            const response = await axios.post("http://127.0.0.1:9800/editor", code, {
                headers: {
                    'Accept': "*/*",
                    'Content-Type': 'text/plain'
                }
            });

            console.log('Server response:', response.data);
            setText(response.data.msg || "Server responded");
        } catch (error) {
            console.error('Error sending code:', error);
            setText('Error occurred while sending code.');
        }
    }

    return (
        <div className="app">
            <Sidebar />


            <div className="main-content">
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Marie
                </Typography>
                <Grid container spacing={3} sx={{ height: '100vh' }}>
                    <Grid item xs={10}>
                        {/* Editor */}
                        <Box
                            sx={{
                                width: "100%",
                                height: "60vh", // Adjust height as needed
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                overflow: "hidden",
                            }}
                        >
                            <Editor
                                height="100%"
                                width="100%"
                                theme="vs-dark"
                                language="java"
                                onMount={handleEditorDidMount}
                                options={{
                                    scrollBeyondLastLine: false,
                                    fontSize: "18px",
                                }}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={10}>
                        {/* Output Field */}
                        <TextField
                            id="compiled"
                            multiline
                            rows={4}
                            fullWidth
                            value={text}
                            disabled
                            sx={{
                                bgcolor: "#f5f5f5",
                                color: "#212121",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                padding: "10px", // Add padding for spacing inside
                            }}
                        />
                    </Grid>

                    <Grid item xs={10} container justifyContent="flex-start">
                        {/* Buttons */}
                        <Button
                            variant="contained"
                            color="success"
                            className="me-3"
                            onClick={() => getCode()}
                        >
                            Run
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

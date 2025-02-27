import React, { useState } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CONSTANTS } from "../../Constants/Constants";
export default function PasswordVerification() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };



    const handleVerify = async () => {
        const response = await axios.post(`http://127.0.0.1:${CONSTANTS.PORT}/verifypassword`, { password }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        if (response.status == 200) {
            localStorage.setItem("user", JSON.stringify(response.data.data1));
            navigate("/dashboard");
        }
        else {
            setError("Passwords do not match!");
        }


    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "25vw",
                padding: "20px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        >
            <Typography variant="h5" mb={2}
                sx={{
                    color: "black"
                }}>
                Verify Password
            </Typography>

            <TextField
                label="Enter Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                sx={{ marginBottom: "16px", width: "300px" }}
                error={Boolean(error)}
                helperText={error}
            />
            <Button
                variant="contained"
                color="success"
                onClick={handleVerify}
                sx={{ width: "300px" }}
            >
                Verify Password
            </Button>
        </Box>
    );
}

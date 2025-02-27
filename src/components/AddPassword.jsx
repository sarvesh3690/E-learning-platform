import React, { useState } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CONSTANTS } from "../../Constants/Constants";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleReset = async () => {
        if (password === confirmPassword) {
            try {
                const response = await axios.post(`http://127.0.0.1:${CONSTANTS.PORT}/resetpassword`, { password }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                if (response.status === 200) {
                    localStorage.setItem("user", JSON.stringify(response.data.data1));
                    navigate("/dashboard");
                }
            } catch (error) {
                setError("Failed to reset password.");
                console.error("Error resetting password:", error);
            }
        } else {
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
            <Typography variant="h5" sx={{ color: "black" }} mb={2}>
                Add Password
            </Typography>
            <TextField
                label="New Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                sx={{ marginBottom: "16px" }}
            />
            <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={Boolean(error)}
                helperText={error}
                sx={{ marginBottom: "16px" }}
            />
            <Button
                variant="contained"
                color="success"
                onClick={handleReset}
                sx={{ width: "100%" }}
            >
                Add Password
            </Button>
        </Box>
    );
}

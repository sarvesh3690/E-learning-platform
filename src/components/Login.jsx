import React, { useState } from "react";
import { TextField, Box, Typography, Button, Tabs, Tab } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CONSTANTS } from "../../Constants/Constants";

export default function LoginWithOtpOrPassword() {
    const [role, setRole] = useState("student"); // Default role
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [otpFieldVisible, setOtpFieldVisible] = useState(false);
    const [passwordFieldVisible, setPasswordFieldVisible] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [otpError, setOtpError] = useState(false);

    const navigate = useNavigate();

    // API Endpoints Based on Role
    const API_ENDPOINTS = {
        student: `http://localhost:${CONSTANTS.PORT}/student`,
        modulecoordinator: `http://localhost:${CONSTANTS.PORT}/modulecoordinator`,
        admin: `http://localhost:${CONSTANTS.PORT}/admin`,
    };

    const DASHBOARD_ROUTES = {
        student: "/dashboard",
        modulecoordinator: "/addrecording",
        admin: "/addstudent",
    };

    // Handle Role Selection
    const handleRoleChange = (event, newValue) => {
        setRole(newValue);
        setOtpFieldVisible(false);
        setPasswordFieldVisible(false);
        setEmail("");
        setOtp("");
        setPassword("");
        setConfirmPassword("");
        setError("");
        setEmailError(false);
        setOtpError(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError(false);
    };

    const handleOtpChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,4}$/.test(value)) {
            setOtp(value);
            setOtpError(value.length !== 4);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleLogin = async () => {
        if (!email) {
            setEmailError(true);
            return;
        }

        try {
            const response = await axios.post(
                `${API_ENDPOINTS[role]}/authenticate`,
                { email },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200) {
                setOtpFieldVisible(true);
            } else if (response.status === 204) {
                setPasswordFieldVisible(true);
            } else {
                setEmailError(true);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setEmailError(true);
        }
    };

    const handleOtpVerify = async () => {
        if (!otpError && otp.length === 4) {
            try {
                const response = await axios.post(
                    `${API_ENDPOINTS[role]}/verifyotp`,
                    { email, otp },
                    { headers: { "Content-Type": "application/json" } }
                );
                if (response.status === 200) {
                    setOtpFieldVisible(false);
                    setPasswordFieldVisible(true);
                } else {
                    setOtpError(true);
                }
            } catch (error) {
                console.error("Error during OTP verification:", error);
                setOtpError(true);
            }
        } else {
            alert("Please enter a valid 4-digit OTP.");
        }
    };

    const handlePasswordSubmit = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        try {
            const response = await axios.post(
                `${API_ENDPOINTS[role]}/addpassword`,
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data));
                console.log(JSON.parse(localStorage.getItem("user")));
                setPasswordFieldVisible(false);
                navigate(DASHBOARD_ROUTES[role]);
            }
        } catch (error) {
            console.error("Error during password setup:", error);
            setError("Failed to set password.");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "20px",
                    width: "400px",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
            >
                <Typography variant="h5" sx={{ color: "black" }} mb={2}>
                    Login
                </Typography>

                {/* Tabs for Role Selection */}
                <Tabs
                    value={role}
                    onChange={handleRoleChange}
                    variant="fullWidth"
                    sx={{ marginBottom: "16px" }}
                >
                    <Tab label="Student" value="student" />
                    <Tab label="Teacher" value="modulecoordinator" />
                    <Tab label="Admin" value="admin" />
                </Tabs>

                {/* Email Input and Login Button */}
                {!otpFieldVisible && !passwordFieldVisible && (
                    <>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            error={emailError}
                            helperText={emailError ? "Please enter a valid email address." : ""}
                            value={email}
                            onChange={handleEmailChange}
                            sx={{ marginBottom: "16px" }}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleLogin}
                            sx={{ width: "100%" }}
                        >
                            Continue
                        </Button>
                    </>
                )}

                {/* OTP Verification */}
                {otpFieldVisible && (
                    <>
                        <TextField
                            label="Enter OTP"
                            variant="outlined"
                            fullWidth
                            error={otpError}
                            helperText={otpError ? "Please enter a valid 4-digit OTP." : ""}
                            value={otp}
                            onChange={handleOtpChange}
                            sx={{ marginBottom: "16px" }}
                            inputProps={{
                                inputMode: "numeric",
                                maxLength: 4,
                                style: { textAlign: "center" },
                            }}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleOtpVerify}
                            sx={{ width: "100%" }}
                        >
                            Verify OTP
                        </Button>
                    </>
                )}

                {/* Password Setup */}
                {passwordFieldVisible && (
                    <>
                        <TextField
                            label="Password"
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
                            onClick={handlePasswordSubmit}
                            sx={{ width: "100%" }}
                        >
                            Login
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
}

import React, { useState } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CONSTANTS } from "../../Constants/Constants";

export default function LoginWithOtpOrPassword() {
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
                `http://localhost:${CONSTANTS.PORT}/student/authenticate`,
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
                    `http://localhost:${CONSTANTS.PORT}/student/verifyotp`,
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
                `http://localhost:${CONSTANTS.PORT}/student/addpassword`,
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data));
                setPasswordFieldVisible(false);
                navigate("/dashboard");
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
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "25vw",
                height: "auto",
                padding: "16px",
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
                Login
            </Typography>

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
    );
}

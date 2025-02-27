import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-scroll";
// Assets
import LogoImg from "../../assets/svg/Logo";

export default function Contact() {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <Box sx={{ width: "100%", backgroundColor: "#1E1E2F", py: 3 }}>
      <Box
        className="container"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          textAlign: "center",
          px: 2,
        }}
      >
        {/* Logo and Name */}
        <Box
          component={Link}
          to="home"
          smooth={true}
          offset={-80}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            textDecoration: "none",
            color: "white",
          }}
        >
          <LogoImg />
          <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold", color: "white" }}>
            Bytebase
          </Typography>
        </Box>

        {/* Copyright Text */}
        <Typography variant="body2" color="white">
          © {getCurrentYear()} - Bytebase. All Rights Reserved.
        </Typography>

        {/* Back to Top Button */}
        <Button
          component={Link}
          to="home"
          smooth={true}
          offset={-80}
          sx={{
            fontSize: "13px",
            textTransform: "none",
            color: "white",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Back to Top
        </Button>
      </Box>
    </Box>
  );
}

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
// Assets
import HeaderImage from "../../assets/img/bytebase_426x607.png";
import QuotesIcon from "../../assets/svg/Quotes";
import Dots from "../../assets/svg/Dots";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Box
      id="home"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // Centering horizontally
        flexWrap: "wrap",
        flexDirection: "column", // Stack items vertically
        paddingTop: "80px",
        minHeight: "840px",
        gap: 4,
        textAlign: "center",
        marginTop: 5, // Ensuring text aligns center
        
      }}
    >
      {/* Left Side */}
      <Box sx={{ width: { xs: "100%", md: "60%" } }}>
        <Typography variant="h3" fontWeight="bold">
          Welcome to Bytebase: Simplify Learning, Maximize Growth.
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 2, mb: 4 }}>
          "An integrated platform for seamless interaction between students, teacher"
        </Typography>
        {/* <Button
          variant="contained"
          color="success"
          sx={{ width: "200px" }}
          onClick={() => navigate("/get-started")}
        >
          Get Started
        </Button> */}
      </Box>

      {/* Right Side */}
      <Box sx={{ width: { xs: "100%", md: "60%" }, position: "relative", textAlign: "center" }}>
        {/* Main Image */}
        <Box component="img" src={HeaderImage} alt="class" sx={{ borderRadius: "8px", width: "90%" }} />

        {/* Quote Box */}
        <Box
          sx={{
            position: "absolute",
            left: "50%", // Centering the box
            transform: "translateX(-50%)", // Adjusting for exact center
            bottom: "50px",
            maxWidth: "330px",
            padding: "30px",
            backgroundColor: "#1E1E2F",
            borderRadius: "8px",
            color: "white",
            textAlign: "left",
          }}
        >
          <QuotesIcon />
          <Typography variant="body1">
            <ul>
              <li>Role-based access for secure collaboration.</li>
              <li>Centralized assignment and lecture management.</li>
              <li>Interactive code debugging tools.</li>
            </ul>
          </Typography>
        </Box>

        {/* Decorative Dots */}
        <Box
          sx={{
            position: "absolute",
            right: "7%",
            transform: "translateX(50%)", // Centering dots horizontally
            bottom: "70px",
            display: { xs: "none", md: "block" },
          }}
        >
          <Dots />
        </Box>
      </Box>
    </Box>
  );
}

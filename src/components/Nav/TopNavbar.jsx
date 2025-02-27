import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-scroll";
// Assets
import LogoIcon from "../../assets/svg/Logo";
import { useNavigate } from "react-router-dom";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Sidebar Drawer */}
      <Drawer anchor="right" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <List>
          {["Home", "About", "Contact"].map((text, index) => (
            <ListItem button key={index} onClick={() => setSidebarOpen(false)}>
              <Link to={text.toLowerCase()} smooth={true} offset={-80}>
                <ListItemText primary={text} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Top Navbar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#1E1E2F", transition: "height 0.3s", height: y > 100 ? "60px" : "80px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <LogoIcon />
            <Typography variant="h6" sx={{ marginLeft: "15px", fontWeight: "bold" }}>
              Bytebase
            </Typography>
          </Box>

          {/* Navigation Links (Hidden on Mobile) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button color="inherit">
              <Link to="home" smooth={true} offset={-80}>
                Home
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="about" smooth={true} offset={-80}>
                About
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="contact" smooth={true} offset={-80}>
                Contact
              </Link>
            </Button>
          </Box>

          {/* "Get Started" Button (Hidden on Mobile) */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button variant="contained" color="secondary" onClick={() => navigate("/login")}>
              Get Started
            </Button>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton sx={{ display: { md: "none" } }} onClick={() => setSidebarOpen(true)} color="inherit">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

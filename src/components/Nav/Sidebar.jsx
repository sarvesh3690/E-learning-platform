import React from "react";
import { Drawer, List, ListItem, ListItemText, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-scroll";
// Assets
import LogoIcon from "../../assets/svg/Logo";

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  return (
    <Drawer anchor="right" open={sidebarOpen} onClose={() => toggleSidebar(false)}>
      {/* Sidebar Header */}
      <Box sx={{ width: 300, height: "100vh", bgcolor: "red", color: "white", display: "flex", flexDirection: "column", padding: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LogoIcon />
            <Typography variant="h6" sx={{ marginLeft: 2, fontWeight: "bold" }}>
              Bytebase
            </Typography>
          </Box>
          {/* Close Button */}
          <IconButton onClick={() => toggleSidebar(false)} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Navigation Links */}
        <List>
          {["Home", "About", "Contact"].map((text, index) => (
            <ListItem button key={index} onClick={() => toggleSidebar(false)}>
              <Link to={text.toLowerCase()} smooth={true} offset={-60} style={{ textDecoration: "none", color: "white", width: "100%" }}>
                <ListItemText primary={text} />
              </Link>
            </ListItem>
          ))}
        </List>

        {/* "Get Started" Button */}
        <Box sx={{ marginTop: "auto", textAlign: "center" }}>
          <ListItem button sx={{ bgcolor: "black", borderRadius: 2, color: "white", justifyContent: "center", margin: "20px 0" }}>
            <a href="/" style={{ textDecoration: "none", color: "white" }}>Get Started</a>
          </ListItem>
        </Box>
      </Box>
    </Drawer>
  );
}

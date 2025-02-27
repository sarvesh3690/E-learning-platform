import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Box } from "@mui/material";
import { Menu as MenuIcon, Dashboard, Assignment, PlayCircle, Class, AccountCircle, Code, ExitToApp } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setIsOpen(!isOpen);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Assignment", icon: <Assignment />, path: "/assignment" },
    { text: "Recorded Session", icon: <PlayCircle />, path: "/recordedsession" },
    { text: "Class Work", icon: <Class />, path: "/classwork" },
    { text: "Profile", icon: <AccountCircle />, path: "/profile" },
    { text: "Editor", icon: <Code />, path: "/editor" },
  ];

  return (
    <>
      {/* Hamburger Menu Button - Visible on small screens */}
      <IconButton
        onClick={handleToggle}
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1300,
          backgroundColor: "white",
          boxShadow: 2,
          display: { xs: "block", md: "none" }, // Show only on small screens
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        open
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            backgroundColor: "#1E1E2F",
            color: "white",
          },
          display: { xs: "none", md: "block" }, // Hide on small screens
        }}
      >
        <Box sx={{ textAlign: "center", p: 2, fontWeight: "bold", fontSize: 18 }}>
          Menu
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          {/* Logout Button */}
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogOut} sx={{ color: "red" }}>
              <ListItemIcon sx={{ color: "red" }}>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Sidebar for Small Screens */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={handleToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            backgroundColor: "#1E1E2F",
            color: "white",
          },
        }}
      >
        <Box sx={{ textAlign: "center", p: 2, fontWeight: "bold", fontSize: 18 }}>
          Menu
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.path} onClick={handleToggle}>
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogOut} sx={{ color: "red" }}>
              <ListItemIcon sx={{ color: "red" }}>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Sidebar;

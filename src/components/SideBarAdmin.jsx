import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Box } from "@mui/material";
import { Menu as MenuIcon, Add, People, ExitToApp } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

function SidebarAdmin({ setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false); // Toggle for mobile sidebar
  const navigate = useNavigate();

  const handleToggle = () => setIsOpen(!isOpen);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const menuItems = [
    { text: "Add Student", icon: <Add />, path: "/addstudent" },
    { text: "Add Teacher", icon: <People />, path: "/addteacher" },
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

      {/* Sidebar Drawer for Large Screens (Permanent) */}
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

      {/* Sidebar Drawer for Small Screens (Temporary) */}
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
    </>
  );
}

export default SidebarAdmin;

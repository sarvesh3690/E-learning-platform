import React, { useState } from "react";
import {
  Box, Card, CardContent, CardHeader, Typography, Grid, TextField,
  Button, Avatar, Alert
} from "@mui/material";
import axios from "axios";
import Sidebar from "./SideBar";
import { CONSTANTS } from "../../Constants/Constants"; // Ensure this contains the backend URL


function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    id: "", // Ensure user ID is stored
    name: "Guest User",
    email: "",
    prn: "",
    phone: "",
  };

  const [user, setUser] = useState(storedUser);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(""); // Message state

  // Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle update profile
  const handleUpdateProfile = async () => {
    if (isEditing) {
      try {
        const response = await axios.put(
          `http://localhost:${CONSTANTS.PORT}/student/updatestudent/${user.id}`,
          {
            name: user.name,
            phone: user.phone,
          }
        );

        if (response.status === 200) {
          alert("Profile updated successfully!");
          localStorage.setItem("user", JSON.stringify(user)); // Update local storage
          setMessage(""); // Clear message on successful update
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Profile update failed.");
      }
    } else {
      setMessage("Only Name and Phone Number can be updated."); // Show message on edit mode
    }

    setIsEditing(!isEditing);
  };

  // Get user initials for Avatar
  const getInitials = (name) => {
    return name.split(" ").map((part) => part.charAt(0).toUpperCase()).join("");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Profile Card */}
        <Card sx={{ mb: 3, textAlign: "center", position: "relative" }}>
          <Box sx={{
            height: 150,
            backgroundImage: "url('/img/header.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative"
          }} />
          <Avatar sx={{
            width: 100, height: 100, position: "absolute", top: 100,
            left: "50%", transform: "translateX(-50%)",
            border: "3px solid white", fontSize: "2rem",
            backgroundColor: "#1976d2",
          }}>
            {user.name ? getInitials(user.name) : "U"}
          </Avatar>
          <CardContent sx={{ mt: 6 }}>
            <Typography variant="h5">{user.name}</Typography>
            <Typography color="textSecondary">{user.prn}</Typography>
          </CardContent>
        </Card>

        {/* User Profile Form */}
        <Card>
          <Box sx={{
            height: 150,
            backgroundImage: "url('/img/bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "cover",

          }} />
          <CardHeader title="User Profile" />
          <CardContent>
            {message && <Alert severity="info" sx={{ mb: 2 }}>{message}</Alert>}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  value={user.name}
                  onChange={handleChange}
                  InputProps={{ readOnly: !isEditing }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email Address"
                  fullWidth
                  value={user.email}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="PRN Number"
                  fullWidth
                  value={user.prn}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Phone"
                  name="phone"
                  fullWidth
                  value={user.phone}
                  onChange={handleChange}
                  InputProps={{ readOnly: !isEditing }}
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
                  {isEditing ? "Save Profile" : "Update Profile"}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Profile;

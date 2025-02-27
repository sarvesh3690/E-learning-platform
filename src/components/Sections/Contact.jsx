import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function Contact() {
  return (
    <Box id="contact" sx={{ width: "100%", py: 8, px: 2, textAlign: "center" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Let's Get in Touch
        </Typography>
      </Box>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 600,
          mx: "auto",
          gap: 2,
          
        }}
      >
        {/* Name Field */}
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          InputProps={{ style: { fontWeight: "bold" } }}
        />

        {/* Email Field */}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          InputProps={{ style: { fontWeight: "bold" } }}
        />

        {/* Subject Field */}
        <TextField
          label="Subject"
          variant="outlined"
          fullWidth
          InputProps={{ style: { fontWeight: "bold" } }}
        />

        {/* Message Field */}
        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          InputProps={{ style: { fontWeight: "bold" } }}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2, width: "50%", fontWeight: "bold" }}
        >
          Send Message
        </Button>
      </Box>
    </Box>
  );
}

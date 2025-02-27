import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

export default function About() {
  return (
    <Box id="about" sx={{ width: "100%", py: 8, px: 2, textAlign: "center"}}>
      <Box sx={{ mb: 4}}>
        <Typography variant="h4" fontWeight="bold">
          About Us
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, maxWidth: 700, mx: "auto" }}>
          Welcome to ByteBase! At ByteBase, we aim to revolutionize the way students, teachers, and administrators
          interact and collaborate in the digital education space. Our platform is designed to simplify learning,
          streamline processes, and empower users with cutting-edge tools for success.
        </Typography>
      </Box>

      {/* About Cards Section */}
      <Grid container spacing={4} justifyContent="center">
        <AboutCard
          title="Our Vision"
          content="To bridge the gap between technology and education by creating an intuitive, 
                    secure, and feature-rich platform that caters to the evolving needs of modern learners and educators."
        />
        <AboutCard
          title="Our Mission"
          content="We strive to provide a centralized hub for academic activities, enabling users to 
                    access assignments, lecture recordings, and coding tools all in one place."
        />
        <AboutCard
          title="What We Offer"
          content={
            <>
              <ul style={{ textAlign: "left" }}>
                <li>Role-based access for secure collaboration.</li>
                <li>Centralized assignment and lecture management.</li>
                <li>Interactive code debugging tools.</li>
              </ul>
            </>
          }
        />
        <AboutCard
          title="Why Choose Us?"
          content={
            <>
              <ul style={{ textAlign: "left" }}>
                <li>Streamlined processes for assignments and lecture access.</li>
                <li>Advanced authentication and role-based authorization.</li>
                <li>Features like a code editor for hands-on coding practice.</li>
                <li>A unified platform for students and educators to interact.</li>
              </ul>
            </>
          }
        />
      </Grid>
    </Box>
  );
}

// Reusable About Card Component
const AboutCard = ({ title, content }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ minHeight: 200, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {content}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

import React from "react";
import { CssBaseline, Box } from "@mui/material";
// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import Header from "../components/Sections/Header";
import About from "../components/Sections/About";
import Contact from "../components/Sections/Contact";
import Footer from "../components/Sections/Footer";

export default function Landing() {
  return (
    <>
      <CssBaseline /> {/* Ensures consistent styling across browsers */}
      <TopNavbar />
      <Box component="main">
        <Header />
        <About />
        <Contact />
      </Box>
      <Footer />
    </>
  );
}

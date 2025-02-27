import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Box, Typography, Card, CardContent, useMediaQuery } from "@mui/material";
import Sidebar from "./SideBar";
import axios from "axios";
import { CONSTANTS } from "../../Constants/Constants"

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function Dashboard() {
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const [assignmentData, setAssignmentData] = useState({ total: 0, uploaded: 0 });
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest", prn: "N/A", id: null };

  useEffect(() => {
    if (user.id) {
      axios.get(`http://localhost:${CONSTANTS.PORT}/assignment/${user.id}`)
        .then(response => {
          console.log(response.data);
          setAssignmentData({
            total: parseInt(response.data.total, 10),
            uploaded: parseInt(response.data.uploaded, 10)
          });
        })
        .catch(error => console.error("Error fetching assignment data:", error));
    }
  }, [user.id]);

  const proficiencyData = {
    labels: ["Java", "Python", "C++", "JavaScript", "HTML"],
    datasets: [
      {
        label: "Proficiency Level",
        data: [80, 90, 70, 85, 95],
        backgroundColor: ["yellow", "cyan", "green", "pink", "purple"],
      },
    ],
  };

  const proficiencyOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Static Proficiency Levels" },
    },
  };

  const pieData = {
    labels: ["Assignments Done", "Assignments Pending"],
    datasets: [
      {
        data: [assignmentData.uploaded, assignmentData.total - assignmentData.uploaded],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, p: 3, minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Welcome, {user.name}
        </Typography>

        {/* Student Info Card */}
        <Card sx={{
          mb: 3, p: 2
        }}>
          <CardContent>
            <Typography><strong>Name:</strong> {user.name}</Typography>
            <Typography><strong>PRN:</strong> {user.prn}</Typography>
          </CardContent>
        </Card>



        {/* Assignments Pie Chart */}
        <Card sx={{
          p: 2, height: 400,
          backgroundImage: "url('/img/pie.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          color: "white"
        }}>

          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Assignment Progress</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", height: 300 }}>
              <Pie data={pieData} />
            </Box>
          </CardContent>
        </Card>

        {/* Proficiency Chart */}
        <Card sx={{ mb: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Proficiency Chart</Typography>
            <Box sx={{ height: isSmallScreen ? 300 : 400 }}>
              <Bar data={proficiencyData} options={proficiencyOptions} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Dashboard;

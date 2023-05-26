import React from "react";
import "./App.css";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";

import { AppBar, Container, Toolbar, Typography } from "@mui/material";

import { PatientsManager } from "./pages/patients/Patients";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Link to={"/"} style={{ textDecoration: "none", color: "#FFF" }}>
              <Typography variant="h6">Patient Directory</Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            {/* <Route path="/" element={<Home />}></Route> */}
            <Route path="patients" element={<PatientsManager />}></Route>
            <Route path="*" element={<Navigate to="/patients" replace />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
};

export default App;

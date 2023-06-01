import React from "react";
import "./App.css";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";

import { AppBar, Container, Toolbar, Typography } from "@mui/material";

import { PatientsManager } from "./pages/patients/Patients";
import { PatientDetails } from "./pages/patients/PatientDetails";
import PatientDataProvider from "./context/patientDataContext";
import styled from "@emotion/styled";

const App: React.FC = () => {
  return (
    <>
      <PatientDataProvider>
        <BrowserRouter>
          <AppBarStyled position="static">
            <Toolbar>
              <Link to={"/"} style={{ textDecoration: "none", color: "#FFF" }}>
                <Typography variant="h6">Patient Directory</Typography>
              </Link>
            </Toolbar>
          </AppBarStyled>
          <Container>
            <Routes>
              {/* Set up nested routes */}
              <Route path="patients" element={<PatientsManager />}>
                <Route path=":id" element={<PatientDetails />}></Route>
              </Route>
              {/* rest all the url get should to redirect to /patients as entry point of app */}
              {<Route path="*" element={<Navigate to="/patients" replace />} />}
            </Routes>
          </Container>
        </BrowserRouter>
      </PatientDataProvider>
    </>
  );
};

export default App;

const AppBarStyled = styled(AppBar)`
  margin-bottom: 100px;
`;

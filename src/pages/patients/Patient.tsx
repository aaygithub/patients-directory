import styled from "@emotion/styled";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";

import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { IPatient, IPatientDataContextType } from "../../common/interfaces";
import { PatientDataContext } from "../../context/patientDataContext";
import { usePatientData } from "../../hooks/common/patientData.hook";
import { DeletePatientModal } from "./DeletePatientModal";
import { AvatarImage } from "./PatientTable";

export const PatientDetails = () => {
  const { patientsListLoading } = React.useContext(
    PatientDataContext
  ) as IPatientDataContextType;

  const { id } = useOutletContext() as any;
  const { getPatient, deletePatient } = usePatientData();

  const [patientData, setPatientData] = useState<IPatient>();

  const [patientDataNotFound, setPatientDataNotFound] =
    useState<boolean>(false);
  const [showPatientDeleteModal, setShowPatientDeleteModal] =
    useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    let patientWithId = getPatient(id);
    if (patientWithId && patientWithId.length > 0)
      setPatientData(patientWithId[0]);
    else if (!patientsListLoading && !patientWithId) {
      setPatientDataNotFound(true);
    }
  }, [patientsListLoading]);

  return (
    <>
      <Grid
        item
        xs={12}
        sm
        container
        spacing={4}
        data-testid="patient-details-wrapper"
      >
        <IconButton
          aria-label="back-to-patientList"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
        </IconButton>
      </Grid>
      {!patientsListLoading && (
        <Box sx={{ flexGrow: 1 }}>
          {patientData && (
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={10}>
                  <Grid item>
                    <AvatarImage
                      style={{
                        backgroundImage: `url(${patientData.avatar})`,
                        width: "150px",
                        height: "150px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs={6}>
                      <DataHolder>
                        <Typography variant="caption" gutterBottom>
                          First name
                        </Typography>
                        <Typography
                          variant="body1"
                          component="div"
                          data-testid="first-name"
                        >
                          {patientData.first_name}
                        </Typography>
                      </DataHolder>
                    </Grid>
                    <Grid item xs={6}>
                      <DataHolder>
                        <Typography variant="caption" gutterBottom>
                          Last name
                        </Typography>
                        <Typography
                          variant="body1"
                          component="div"
                          data-testid="last-name"
                        >
                          {patientData.last_name}
                        </Typography>
                      </DataHolder>
                    </Grid>
                    <Grid item xs={12}>
                      <DataHolder>
                        <Typography variant="caption" gutterBottom>
                          Email
                        </Typography>
                        <Typography
                          variant="body1"
                          component="div"
                          data-testid="email"
                        >
                          {patientData.email}
                        </Typography>
                      </DataHolder>
                    </Grid>
                    <Grid item xs={6}>
                      <DataHolder>
                        <Typography variant="caption" gutterBottom>
                          Gender
                        </Typography>
                        <Typography
                          variant="body1"
                          component="div"
                          data-testid="gender"
                        >
                          {patientData.gender}
                        </Typography>
                      </DataHolder>
                    </Grid>
                    <Grid item xs={6}>
                      <DataHolder>
                        <Typography variant="caption" gutterBottom>
                          Age
                        </Typography>
                        <Typography
                          variant="body1"
                          component="div"
                          data-testid="age"
                        >
                          {patientData.age}
                        </Typography>
                      </DataHolder>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Box
                  sx={{ flexGrow: 1 }}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      setShowPatientDeleteModal(true);
                    }}
                    data-testid="delete-button"
                  >
                    Delete
                  </Button>
                </Box>
              </CardActions>
            </Card>
          )}
        </Box>
      )}
      {patientsListLoading && (
        <DisplayCenter>
          <div>
            <CircularProgress color="secondary" />
          </div>
          <div>
            <Typography variant="caption" gutterBottom>
              Loading details
            </Typography>
          </div>
        </DisplayCenter>
      )}
      {!patientsListLoading && patientDataNotFound && (
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                navigate("/patients");
              }}
            >
              Search for patients
            </Button>
          }
        >
          No Patient found
        </Alert>
      )}

      {showPatientDeleteModal && patientData && (
        <DeletePatientModal
          onCancel={() => {
            setShowPatientDeleteModal(false);
          }}
          onConfirm={() => {
            deletePatient(patientData.patient_id, () => {
              navigate(`/patients`);
            });
          }}
          patientData={patientData}
        />
      )}
    </>
  );
};

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const DisplayCenter = styled.div`
  padding: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const DataHolder = styled.div``;

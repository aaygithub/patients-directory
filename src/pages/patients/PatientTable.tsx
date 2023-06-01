import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import styled from "@emotion/styled";

import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  IPatient,
  ISearchFilterContextType,
  TOrder,
} from "../../common/interfaces";
import { HighLightText } from "../../components/HighLightText";
import { TableHeadCell } from "../../components/TableHeadCell";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SearchFilterContext } from "../../context/searchFilterContext";

interface IPatientTableProps {
  patientList: IPatient[];
  searchTextHighLight: string;
}

export const PatientTable: React.FC<IPatientTableProps> = ({ patientList }) => {
  const { columnSort, updateColumnSort, searchFilter } = React.useContext(
    SearchFilterContext
  ) as ISearchFilterContextType;

  const setSorting = (sortBy: string, sortAs: TOrder) => {
    updateColumnSort({ sortBy, sortAs });
  };

  const navigate = useNavigate();

  return (
    <TableContainer
      component={Paper}
      style={{ marginTop: "40px" }}
      data-testid="patient-table-wrapper"
    >
      <Table>
        <TableHead>
          <TableRow style={{ fontWeight: "bold" }}>
            <TableCell></TableCell>
            <TableCell>
              <TableHeadCell
                active={columnSort.sortBy === "patient_id"}
                setSorting={setSorting}
                sortByAs={columnSort.sortAs}
                valueKey={"patient_id"}
              >
                ID
              </TableHeadCell>
            </TableCell>
            <TableCell>
              <TableHeadCell
                active={columnSort.sortBy === "first_name"}
                setSorting={setSorting}
                sortByAs={columnSort.sortAs}
                valueKey={"first_name"}
              >
                First name
              </TableHeadCell>
            </TableCell>
            <TableCell>
              <TableHeadCell
                active={columnSort.sortBy === "last_name"}
                setSorting={setSorting}
                sortByAs={columnSort.sortAs}
                valueKey={"last_name"}
              >
                Last name
              </TableHeadCell>
            </TableCell>

            <TableCell>
              <TableHeadCell>Email</TableHeadCell>{" "}
            </TableCell>
            <TableCell>
              <TableHeadCell>Age</TableHeadCell>{" "}
            </TableCell>
            <TableCell>
              <TableHeadCell>Gender</TableHeadCell>{" "}
            </TableCell>
            <TableCell>
              <TableHeadCell>Option</TableHeadCell>{" "}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientList?.map((patient, index) => (
            <TableRow
              key={patient.patient_id}
              data-testid={`table-row-${index}`}
            >
              <TableCell>
                <AvatarImage
                  style={{ backgroundImage: `url(${patient.avatar})` }}
                />
              </TableCell>
              <TableCell>
                <HighLightText match={searchFilter.searchText}>
                  {patient.patient_id.toString()}
                </HighLightText>
              </TableCell>
              <TableCell>
                <HighLightText match={searchFilter.searchText}>
                  {patient.first_name}
                </HighLightText>
              </TableCell>
              <TableCell>
                <HighLightText match={searchFilter.searchText}>
                  {patient.last_name}
                </HighLightText>
              </TableCell>
              <TableCell>
                <HighLightText match={searchFilter.searchText}>
                  {patient.email}
                </HighLightText>
              </TableCell>
              <TableCell>
                <HighLightText match={searchFilter.searchText}>
                  {patient.age.toString()}
                </HighLightText>
              </TableCell>
              <TableCell>
                <HighLightText>{patient.gender}</HighLightText>
              </TableCell>
              <TableCell>
                <Button
                  style={{ marginLeft: "10px" }}
                  variant="text"
                  color="primary"
                  size="medium"
                  onClick={() => {
                    navigate(`/patients/${patient.patient_id}`);
                  }}
                >
                  <VisibilityIcon />{" "}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {patientList.length === 0 && (
        <>
          <Typography
            style={{
              textAlign: "center",
              padding: "20px",
            }}
            variant="h6"
          >
            {"  "}
            No Patient(s) found.
          </Typography>
        </>
      )}
    </TableContainer>
  );
};

export const AvatarImage = styled.div`
  background: url() 50% 50% no-repeat;
  background-size: cover;
  border-radius: 25%;
  width: 30px;
  height: 30px;

  .square span {
    display: block;
    width: 30px;
    height: 30px;
  }
`;

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

import { IPatient, ISearchFilterContextType } from "../../common/interfaces";
import { HighLightText } from "../../components/HighLightText";
import { TableHeadCell, TOrder } from "../../components/TableHeadCell";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SearchFilterContext } from "../../context/searchFilterContext";

interface IPatientTableProps {
  patientList: IPatient[];
  searchTextHighLight: string;
}

export const PatientTable: React.FC<IPatientTableProps> = ({
  patientList,
  searchTextHighLight,
}) => {
  const { columnSort, updateColumnSort, searchFilter } = React.useContext(
    SearchFilterContext
  ) as ISearchFilterContextType;

  const setSorting = (sortBy: string, sortAs: TOrder) => {
    updateColumnSort({ sortBy, sortAs });
  };

  console.log("columnSort :: ", columnSort);
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} style={{ marginTop: "40px" }}>
      <Table>
        <TableHead>
          <TableRow style={{ fontWeight: "bold" }}>
            <TableCell></TableCell>
            <TableCell>
              <TableHeadCell>ID</TableHeadCell>
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
                //sortByColumn={columnSort.SortBy}
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
          {patientList?.map((patient) => (
            <TableRow key={patient.patient_id}>
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
          {console.log(" Displaying no records found")}
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

const AvatarImage = styled.div`
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

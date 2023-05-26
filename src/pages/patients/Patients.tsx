import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

import styled from "@emotion/styled";
import { IPatient } from "../../common/interfaces";
import { IFilterData, Filter } from "./Filter";
import { getPatients } from "../../service/patient";
import { TableHeadCell, TOrder } from "../../components/TableHeadCell";
import { HighLightText } from "../../components/HighLightText";

interface IPatientsManagerProps {
  // no props are sent.
}

type sortArg<T> = keyof T;

export const PatientsManager: React.FC<IPatientsManagerProps> = () => {
  const [loadingPatients, setLoadingPatients] = useState<boolean>(true);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [patientsFiltered, setPatientsFiltered] = useState<IPatient[]>([]);

  const [searchTextHighLight, setSearchTextHighLight] = useState<string>("");
  const [sortByColumn, setSortByColumn] = useState<string>();
  const [sortByAs, setSortByAs] = useState<TOrder>();

  useEffect(() => {
    getPatients().then((patients) => {
      setLoadingPatients(false);
      setPatients(patients);
      setPatientsFiltered(patients);
    });
  }, []);

  const onFilterChange = ({ searchText, ageRange, gender }: IFilterData) => {
    let filteredPatients: IPatient[] = [...patients];
    if (searchText && searchText !== "") {
      filteredPatients = filteredPatients.filter((patientItem) => {
        return (
          patientItem.patient_id +
          patientItem.first_name +
          patientItem.last_name +
          patientItem.email +
          patientItem.age
        ).includes(searchText);
      });
      setSearchTextHighLight(searchText);
    }
    if (ageRange && ageRange !== "") {
      switch (ageRange) {
        case "18 - 30":
          filteredPatients = filteredPatients.filter((patientItem) => {
            return patientItem.age >= 18 && patientItem.age <= 30;
          });
          break;
        case "31 - 45":
          filteredPatients = filteredPatients.filter((patientItem) => {
            return patientItem.age >= 31 && patientItem.age <= 45;
          });
          break;
        case "> 45":
          filteredPatients = filteredPatients.filter((patientItem) => {
            return patientItem.age > 45;
          });
          break;
      }
    }

    if (gender && gender !== "") {
      filteredPatients = filteredPatients.filter((patientItem) => {
        return patientItem.gender === gender;
      });
    }

    setPatientsFiltered(filteredPatients);
  };

  const setSorting = (sortBy: string, sortAs: TOrder) => {
    let patientsArr = [...patientsFiltered];

    type ObjectKey = keyof (typeof patients)[0];
    const formDataKey = sortBy as ObjectKey;
    patientsArr.sort(sortbyPropertiesOf<IPatient>(formDataKey, sortAs));
    setPatientsFiltered(patientsArr);
    setSortByAs(sortAs);
    setSortByColumn(sortBy);
  };

  const sortbyPropertiesOf = <T extends object>(
    sortBy: sortArg<T>,
    sortAs: TOrder
  ) => {
    function compareByProperty(arg: sortArg<T>, sortAs: TOrder) {
      let key: keyof T;
      let sortOrder = 1;
      if (typeof arg === "string" && sortAs === "des") {
        sortOrder = -1;
      }
      key = arg as keyof T;
      return function (a: T, b: T) {
        let aValue = a[key];
        let bValue = b[key];
        const result = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        return result * sortOrder;
      };
    }

    return function (obj1: T, obj2: T) {
      let result = 0;
      result = compareByProperty(sortBy, sortAs)(obj1, obj2);
      return result;
    };
  };

  return (
    <>
      <Filter onFilterChange={onFilterChange} />

      {loadingPatients && (
        <LoadingSectionStyled>
          <TableContainer component={Paper} style={{ marginTop: "40px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(5)].map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </LoadingSectionStyled>
      )}
      {!loadingPatients && (
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
                    active={sortByColumn === "first_name"}
                    setSorting={setSorting}
                    //sortByColumn={sortByColumn}
                    sortByAs={sortByAs}
                    valueKey={"first_name"}
                  >
                    First name
                  </TableHeadCell>
                </TableCell>
                <TableCell>
                  <TableHeadCell
                    active={sortByColumn === "last_name"}
                    setSorting={setSorting}
                    //sortByColumn={sortByColumn}
                    sortByAs={sortByAs}
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
              {patientsFiltered.map((patient) => (
                <TableRow key={patient.patient_id}>
                  <TableCell>
                    <AvatarImage
                      style={{ backgroundImage: `url(${patient.avatar})` }}
                    />
                  </TableCell>
                  <TableCell>
                    <HighLightText match={searchTextHighLight}>
                      {patient.patient_id.toString()}
                    </HighLightText>
                  </TableCell>
                  <TableCell>
                    <HighLightText match={searchTextHighLight}>
                      {patient.first_name}
                    </HighLightText>
                  </TableCell>
                  <TableCell>
                    <HighLightText match={searchTextHighLight}>
                      {patient.last_name}
                    </HighLightText>
                  </TableCell>
                  <TableCell>
                    <HighLightText match={searchTextHighLight}>
                      {patient.email}
                    </HighLightText>
                  </TableCell>
                  <TableCell>
                    <HighLightText match={searchTextHighLight}>
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
                      onClick={() => {}}
                    >
                      <VisibilityIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {patientsFiltered.length === 0 && (
            <Typography
              style={{
                textAlign: "center",
                padding: "20px",
              }}
              variant="h6"
            >
              No Patient(s) found.
            </Typography>
          )}
        </TableContainer>
      )}
    </>
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

const LoadingSectionStyled = styled.div``;

// Component to render the search filters and table lising the patients

import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import styled from "@emotion/styled";

import { useEffect, useState } from "react";
import {
  IPatient,
  IPatientDataContextType,
  ISearchFilterContextType,
} from "../../common/interfaces";
import { Filter } from "./Filter";
import { PatientDataContext } from "../../context/patientDataContext";
import React from "react";
import { SearchFilterContext } from "../../context/searchFilterContext";
import { PatientTable } from "./PatientTable";
import { TOrder } from "../../components/TableHeadCell";

type sortArg<T> = keyof T;

export const PatientList: React.FC = () => {
  const [patientsFiltered, setPatientsFiltered] = useState<IPatient[]>();
  const [patientsFilteredSorted, setPatientsFilteredSorted] =
    useState<IPatient[]>();

  const [searchTextHighLight, setSearchTextHighLight] = useState<string>("");

  const { searchFilter, columnSort } = React.useContext(
    SearchFilterContext
  ) as ISearchFilterContextType;

  const { patientsListLoading, patientsList } = React.useContext(
    PatientDataContext
  ) as IPatientDataContextType;

  const onFilterChange = () => {
    const { searchText, ageRange, gender } = searchFilter;
    let filteredPatients: IPatient[] = patientsList ? [...patientsList] : [];
    if (!searchText && !ageRange && !gender) {
      setPatientsFiltered(filteredPatients);
    }
    if (searchText && searchText !== "") {
      filteredPatients = filteredPatients.filter((patientItem) => {
        return (
          patientItem.patient_id +
          " " +
          patientItem.first_name +
          " " +
          patientItem.last_name +
          " " +
          patientItem.email +
          " " +
          patientItem.age
        )
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase());
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

  const setSorting = () => {
    const { sortBy, sortAs } = columnSort;
    let patientsArr: IPatient[] = patientsFiltered ? [...patientsFiltered] : [];

    type ObjectKey = keyof (typeof patientsArr)[0];
    const formDataKey = sortBy as ObjectKey;
    patientsArr.sort(sortbyPropertiesOf<IPatient>(formDataKey, sortAs));
    setPatientsFilteredSorted(patientsArr);
  };

  // Helper function for sorting the patient list w.r.t coloumn provided
  const sortbyPropertiesOf = <T extends object>(
    sortBy: sortArg<T>,
    sortAs?: TOrder
  ) => {
    function compareByProperty(arg: sortArg<T>, sortAs?: TOrder) {
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

  useEffect(() => {
    patientsList && setPatientsFiltered(patientsList);
  }, [patientsList]);

  useEffect(() => {
    onFilterChange();
  }, [searchFilter]);

  useEffect(() => {
    setSorting();
  }, [columnSort, patientsFiltered]);

  return (
    <>
      <Filter />
      <>
        {patientsListLoading && (
          <LoadingSectionStyled>
            {/* loading table table placeholder */}
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
        {!patientsListLoading && patientsFiltered && (
          <PatientTable
            patientList={patientsFilteredSorted ? patientsFilteredSorted : []}
            searchTextHighLight={searchTextHighLight}
          />
        )}
      </>
    </>
  );
};

const LoadingSectionStyled = styled.div``;

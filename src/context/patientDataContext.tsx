// PatientDataContext to store the all the patients data, and selected pataient data
// store all patients so not have to fectch when come back from patients details

import * as React from "react";
import { IPatient, IPatientDataContextType } from "../common/interfaces";

export const PatientDataContext =
  React.createContext<IPatientDataContextType | null>(null);

interface IProps {
  children: React.ReactNode;
}
const PatientDataProvider = ({ children }: IProps) => {
  const [patientData, setPatientData] = React.useState<IPatient | undefined>();
  const [patientsList, setPatientsList] = React.useState<
    IPatient[] | undefined
  >();
  const [patientsListLoading, setPatientsListLoading] =
    React.useState<boolean>(true);

  const updatePatientData = (patientData?: IPatient) => {
    setPatientData(patientData ? patientData : undefined);
  };

  const updatePatientsList = (patientsList?: IPatient[]) => {
    setPatientsList(patientsList ? patientsList : undefined);
    setPatientsListLoading(false);
  };

  return (
    <PatientDataContext.Provider
      value={{
        patientData,
        patientsList,
        patientsListLoading,
        updatePatientData,
        updatePatientsList,
      }}
    >
      {children}
    </PatientDataContext.Provider>
  );
};

export default PatientDataProvider;

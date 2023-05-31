import React, { useEffect } from "react";

import { IPatientDataContextType } from "../../common/interfaces";
import { Outlet, useParams } from "react-router-dom";
import { PatientDataContext } from "../../context/patientDataContext";
import { PatientList } from "./PatientList";
import { usePatientsService } from "../../hooks/api/patientsService.hook";

interface IPatientsManagerProps {
  // no props are sent.
}

export const PatientsManager: React.FC<IPatientsManagerProps> = () => {
  let params = useParams();

  const { updatePatientsList, patientsList } = React.useContext(
    PatientDataContext
  ) as IPatientDataContextType;

  const { data, loading: loadingPatients } = usePatientsService();

  useEffect(() => {
    console.log("useEffect getPatients::: ", data);
    data && !patientsList && updatePatientsList(data);
  }, [data]);

  return (
    <>
      {!params.id && <PatientList />}
      <Outlet context={[params.id, loadingPatients]} />
    </>
  );
};

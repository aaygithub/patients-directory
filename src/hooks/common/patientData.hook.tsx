import React from "react";
import { IPatient, IPatientDataContextType } from "../../common/interfaces";
import { PatientDataContext } from "../../context/patientDataContext";

interface IUsePatientDataReturn {
  getPatient: (id: string) => IPatient[] | undefined;
  deletePatient: (patientId: number, callback?: () => void) => void;
}

export const usePatientData = (): IUsePatientDataReturn => {
  const { patientsList, patientsListLoading, updatePatientsList } =
    React.useContext(PatientDataContext) as IPatientDataContextType;

  const getPatient = (id: string) => {
    let patientId = Number(id);
    let patientData: IPatient[] | undefined;
    if (!isNaN(patientId) && !patientsListLoading) {
      patientData = patientsList?.filter((item: IPatient) => {
        return patientId === item.patient_id;
      });
    }

    return patientData;
  };

  const deletePatient = (patientId: number, callback?: () => void) => {
    let patientsArr: IPatient[] | undefined;
    if (!isNaN(patientId) && !patientsListLoading) {
      patientsArr = [...(patientsList ? patientsList : [])];
      patientsArr.splice(
        patientsArr.findIndex((element) => element.patient_id === patientId),
        1
      );
      updatePatientsList(patientsArr);
      callback && callback();
    }
  };
  return { getPatient, deletePatient };
};

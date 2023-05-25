import { IPatient } from "../common/interfaces";

export const getPatients = (): Promise<IPatient[]> => {
  return fetch(`${process.env.REACT_APP_API}/patients`).then(
    (response) => response.json() as unknown as IPatient[]
  );
};

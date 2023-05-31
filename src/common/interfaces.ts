export interface IPatient {
  patient_id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: gender;
  age: number;
  avatar: string;
}

export type gender = "Male" | "Female";

export interface IPatientDataContextType {
  patientsListLoading: boolean;
  patientsList?: IPatient[];
  updatePatientsList: (patientsList?: IPatient[]) => void;
  patientData?: IPatient;
  updatePatientData: (patientData?: IPatient) => void;
}

export interface IFilterData {
  searchText?: string;
  ageRange?: string;
  gender?: string;
}

export interface ISearchFilterContextType {
  searchFilter: IFilterData;
  updateSearchFilter: (searchFilter: IFilterData) => void;
}

// common interfaces files for application wide usage

export interface IPatient {
  patient_id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: TGender;
  age: number;
  avatar: string;
}

export type TGender = "Male" | "Female";

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
  columnSort: IColumnSort;
  updateColumnSort: (columnSort: IColumnSort) => void;
}

export type TOrder = "asc" | "des";

export interface IColumnSort {
  sortBy?: string;
  sortAs?: TOrder;
}

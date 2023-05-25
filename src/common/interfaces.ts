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

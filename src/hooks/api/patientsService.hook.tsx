// usePatientsService is the hook that will fetch the list of all patients
// Only fetch once when app is loaded

import { useState, useEffect } from "react";
import { IPatient } from "../../common/interfaces";

export interface IPatientsService {
  status: Number;
  statusText: String;
  data: IPatient[] | undefined;
  error: any;
  loading: Boolean;
}

export const usePatientsService = (): IPatientsService => {
  const [status, setStatus] = useState<Number>(0);
  const [statusText, setStatusText] = useState<String>("");
  const [data, setData] = useState<IPatient[]>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getAPIData = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch(`/patients`);
      const json = await apiResponse.json();
      setStatus(apiResponse.status);
      setStatusText(apiResponse.statusText);
      setData(json as unknown as IPatient[]);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return { status, statusText, data, error, loading };
};

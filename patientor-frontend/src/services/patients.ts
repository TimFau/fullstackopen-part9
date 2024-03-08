import axios from "axios";
import { Patient, PatientFormValues, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};
const addPatientEntry = async (patientId: string, entry: EntryWithoutId )  => {
  const { data } = await axios.post<EntryWithoutId>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
      entry
  );

  return data;
};

export default {
  getAll, getOne, create, addPatientEntry
};


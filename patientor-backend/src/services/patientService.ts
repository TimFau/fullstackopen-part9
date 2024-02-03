import patientData from "../../data/patients";
import { Patient, NewPatient } from "../types";
import { v4 as uuidv4 } from 'uuid';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): Omit<Patient, 'ssn'>[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (params: NewPatient): Patient => {
    const id = uuidv4();
    const newPatient = {id, ...params};
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient
};
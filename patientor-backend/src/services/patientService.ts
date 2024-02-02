import patientData from "../../data/patients";
import { Patient } from "../types";

const patient: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patient;
};

const getNonSensitivePatients = (): Omit<Patient, 'ssn'>[] => {
    return patient.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = () => {
    return null;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient
};
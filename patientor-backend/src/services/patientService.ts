import patientData from "../../data/patients";
import { Patient, NewPatient, NonSensitivePatient, EntryWithoutId  } from "../types";
import { v4 as uuidv4 } from 'uuid';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string) => {
    return patients.find((patient: Patient) => patient.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getNonSensitivePatient = (patientId: string) => {
    const patient = patients.find((patient: Patient) => patient.id === patientId);
    if (patient) {
        const { id, name, dateOfBirth, gender, occupation, entries } = patient;
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
            entries
        };
    }
    return undefined;
};

const addPatient = (params: NewPatient): NewPatient => {
    const id = uuidv4();
    const newPatient = {id, ...params};
    patients.push(newPatient);
    return newPatient;
};

const addPatientEntry = (patientId: string, entry: EntryWithoutId ): EntryWithoutId  => {
    const id = uuidv4();
    const newEntry = {id, ...entry};
    const patient = patients.find((patient: Patient) => patient.id === patientId);
    console.log(patient);
    if (patient) {
        patient.entries.push(newEntry);
    } else {
        console.error('Patient not found');
    }
    return newEntry;
};

export default {
    getPatients,
    getPatient,
    getNonSensitivePatients,
    getNonSensitivePatient,
    addPatient,
    addPatientEntry
};
import { NewPatient } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing data: ' + date);
    }
    return date;
};

const parseGender = (gender: unknown): string => {
    if (!gender || !isString(gender)) {
        throw new Error('Incorrect or missing data: ' + gender);
    }
    return gender;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing data: ' + name);
    }
    return name;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing data: ' + occupation);
    }
    return occupation;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing data: ' + ssn);
    }
    return ssn;
};

const toNewPatient = (object: unknown): NewPatient => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }
    if ('dateOfBirth' in object && 'gender' in object && 'name' in object && 'occupation' in object && 'ssn' in object) {
        const newPatient: NewPatient = {
            dateOfBirth: parseDate(object.dateOfBirth),
            gender: parseGender(object.gender),
            name: parseName(object.name),
            occupation: parseOccupation(object.occupation),
            ssn: parseSsn(object.ssn)
        };
    
        return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;
import { NewPatient, Gender, Entry } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(gender => gender.toString()).includes(param);
};

const isArray = (array: unknown): array is Array<unknown> => {
    return Array.isArray(array);
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing data: ' + date);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
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

const parseEntries = (array: unknown): Entry[] => {
    if (!array || !isArray(array)) {
        throw new Error('Incorrect or missing dataL ' + array);
    }
    return array as Entry[];
};

const toNewPatient = (object: unknown): NewPatient => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }
    if ('dateOfBirth' in object && 'gender' in object && 'name' in object && 'occupation' in object && 'ssn' in object && 'entries' in object) {
        const newPatient: NewPatient = {
            dateOfBirth: parseDate(object.dateOfBirth),
            gender: parseGender(object.gender),
            name: parseName(object.name),
            occupation: parseOccupation(object.occupation),
            ssn: parseSsn(object.ssn),
            entries: parseEntries(object.entries)
        };
    
        return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;
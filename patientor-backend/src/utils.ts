import { NewPatient, Gender, Entry, EntryWithoutId, HealthCheckRating } from "./types";

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

const parseString = (value: unknown): string => {
    if (!value || !isString(value)) {
        throw new Error('Incorrect or missing data: ' + value);
    }
    return value;
};

const parseEntries = (array: unknown): Entry[] => {
    if (!array || !isArray(array)) {
        throw new Error('Incorrect or missing dataL ' + array);
    }
    return array as Entry[];
};

export const toNewPatient = (object: unknown): NewPatient => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }
    if ('dateOfBirth' in object && 'gender' in object && 'name' in object && 'occupation' in object && 'ssn' in object && 'entries' in object) {
        const newPatient: NewPatient = {
            dateOfBirth: parseDate(object.dateOfBirth),
            gender: parseGender(object.gender),
            name: parseString(object.name),
            occupation: parseString(object.occupation),
            ssn: parseString(object.ssn),
            entries: parseEntries(object.entries)
        };
    
        return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }
    if ('id' in object && 'description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
        const newEntryBase = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            diagnosisCodes: 'diagnosisCodes' in object ? object.diagnosisCodes as string[] : undefined
        };
        switch (object.type) {
            case "HealthCheck":
                return {
                    healthCheckRating: 'healthCheckRating' in object ? object.healthCheckRating as HealthCheckRating: 0 as HealthCheckRating,
                    type: "HealthCheck" as const,
                    ...newEntryBase
                };
            case "OccupationalHealthcare":
                return {
                    employerName: 'employerName' in object ? parseString(object.employerName) : '',
                    sickLeave: {
                        startDate: parseDate('startDate' in object ? object.startDate: ''),
                        endDate: parseDate('endDate' in object ? object.endDate : '')
                    },
                    type: "OccupationalHealthcare" as const,
                    ...newEntryBase
                };
            case "Hospital":
                return {
                    discharge: {
                        date: parseDate(object.date),
                        criteria: parseString('criteria' in object ? object.criteria : '')
                    },
                    type: "Hospital" as const,
                    ...newEntryBase
                };
            default:
                throw new Error('Incorrect data: some fields are missing');
        }
    }

    throw new Error('Incorrect data: some fields are missing');
};
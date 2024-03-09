import { NewPatient, Gender, Entry, EntryWithoutId, HealthCheckRating, Diagnosis, SickLeave, Discharge } from "./types";

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

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [] as Array<Diagnosis['code']>;
    }
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseSickLeave = (object: unknown): SickLeave => {
    if (
        !object || typeof object !== 'object' ||
        !('startDate' in object) ||
        !('endDate' in object) ||
        !isString(object.startDate) ||
        !isString(object.endDate)
    ){
        throw new Error ("Incorrect or missing sick leave");
    }
    return {
        startDate: object.startDate,
        endDate: object.endDate
    } as SickLeave;
};

const parseDischarge = (object: unknown): Discharge => {
    if (
        !object || typeof object !== 'object' ||
        !('date' in object) ||
        !('criteria' in object) ||
        !isString(object.date) ||
        !isString(object.criteria)
    ) {
        throw new Error ("Incorrect or missing discharge");
    }
    return {
        date: object.date,
        criteria: object.criteria
    };
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
    if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
        const newEntryBase = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            diagnosisCodes: [] as Array<Diagnosis['code']>
        };
        if ('diagnosisCodes' in object) {
            newEntryBase.diagnosisCodes = parseDiagnosisCodes(object);
        }
        switch (object.type) {
            case "HealthCheck":
                return {
                    healthCheckRating: 'healthCheckRating' in object ? object.healthCheckRating as HealthCheckRating : 0 as HealthCheckRating,
                    type: "HealthCheck",
                    ...newEntryBase
                };
            case "OccupationalHealthcare":
                return {
                    employerName: 'employerName' in object ? parseString(object.employerName) : '',
                    ...('sickLeave' in object ? {
                        sickLeave: parseSickLeave(object.sickLeave)
                    } : {}),
                    type: "OccupationalHealthcare",
                    ...newEntryBase
                };
            case "Hospital":
                return {
                    discharge: parseDischarge('discharge' in object ? object.discharge : null),
                    type: "Hospital",
                    ...newEntryBase
                };
            default:
                throw new Error('Incorrect data: some fields are missing');
        }
    }

    throw new Error('Incorrect data: some fields are missing');
};
export type Diagnosis = {
    code: string,
    name: string,
    latin?: string
};

export type gender = 'male' | 'female';

export type Patient = {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: gender,
    occupation: string
};
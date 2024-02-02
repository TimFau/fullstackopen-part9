import diagnosesData from "./../../data/diagnoses";
import { Diagnosis } from "../types";

const diagnoses : Diagnosis[] = diagnosesData;

const getDiagnoses = () => {
    return diagnoses;
};

const addDiagnosis = () => {
    return null;
};

export default {
    getDiagnoses,
    addDiagnosis
};
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { Patient } from "./../../types";
import { Male as MaleIcon, Female as FemaleIcon } from '@mui/icons-material';

const PatientPage = () => {
    const [patient, setPatient] = useState<Patient>();
    const { id } = useParams();

    useEffect(() => {
        const fetchPatient = async () => {
            const patient = await patientService.getOne(id || '');
            setPatient(patient);
        };
        fetchPatient();
    }, [id]);

    if (!patient) {
        return <div>Loading...</div>;
    }
    console.log('patient', patient);
    return (
        <>
            <h1>{patient.name} <span>{patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}</span></h1>
            <p>ssn: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
        </>
    );
};

export default PatientPage;
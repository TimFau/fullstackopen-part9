import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { Patient, Entry } from "./../../types";
import { Male as MaleIcon, Female as FemaleIcon } from '@mui/icons-material';
import { Card, CardContent } from "@mui/material";

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
            <h2>Entries</h2>
            {Array.isArray(patient.entries) && patient.entries.map((entry: Entry) => (
                <Card key={entry.id} sx={{ marginBottom: '15px' }}>
                    <CardContent>
                        <strong>{entry.date}</strong>
                        <p>{entry.description}</p>
                        {'diagnosisCodes' in entry &&
                            <>
                            <h4>Diagnosis Codes</h4>
                            <ul>
                                {entry.diagnosisCodes?.map(code => (
                                    <li key={code}>{code}</li>
                                ))}
                            </ul>
                            </>

                        }
                    </CardContent>
                </Card>
            ))}
        </>
    );
};

export default PatientPage;
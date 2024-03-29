import React, { useEffect, useState } from "react";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { useParams } from "react-router-dom";
import { Patient, Entry, Diagnosis } from "./../../types";
import { HealthCheckEntry, HospitalEntry, OccupationalEntry } from "./Entries";

import { Male as MaleIcon, Female as FemaleIcon } from '@mui/icons-material';
import NewEntry from "./NewEntry";

const PatientPage = () => {
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchPatient = async () => {
            const patient = await patientService.getOne(id || '');
            setPatient(patient);
            const diagnoses = await diagnosesService.getAll();
            setDiagnoses(diagnoses);
        };
        fetchPatient();
    }, [id]);

    const onNewEntry = (entry: Entry) => {
        console.log('onNewEntry', entry);
        if (entry && patient) {
            const updatedPatient = {
                ...patient,
                entries: patient.entries.concat(entry)
            };
            setPatient(updatedPatient);
        }
    };

    if (!patient || !diagnoses) {
        return <div>Loading...</div>;
    }

    const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
        switch (entry.type) {
            case "Hospital":
                return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
            case "OccupationalHealthcare":
                return <OccupationalEntry entry={entry} diagnoses={diagnoses} />;
            case "HealthCheck":
                return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
            default:
                return null;
        }
    };

    return (
        <>
            <h1>{patient.name} <span>{patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}</span></h1>
            <p>ssn: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <h2>Entries</h2>
            {Array.isArray(patient.entries) && patient.entries.map((entry: Entry) => (
                <EntryDetails entry={entry} key={entry.id} />
            ))}
            <NewEntry patientId={patient.id} diagnoses={diagnoses} onNewEntry={(entry: Entry) => onNewEntry(entry)} />
        </>
    );
};

export default PatientPage;
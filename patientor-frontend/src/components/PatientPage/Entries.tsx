import { Card, CardContent } from "@mui/material";
import {
    Work as WorkIcon,
    MedicalServices as MedicalServicesIcon,
    LocalHospital as LocalHospitalIcon,
    Favorite as HeartIcon
} from "@mui/icons-material";
import { Diagnosis, Entry } from "../../types";

interface EntryBaseProps {
    entry: Entry;
}

interface HospitalEntryProps extends EntryBaseProps {
    diagnoses: Diagnosis[];
}

export const HospitalEntry = ({ entry, diagnoses }: HospitalEntryProps) => {
    // console.log('HospitalEntry', entry);
    if ('discharge' in entry) {
        return (
            <Card key={entry.id} sx={{ marginBottom: '15px' }}>
                <CardContent>
                    <strong>{entry.date} <LocalHospitalIcon /></strong>
                    <p>{entry.description}</p>
                    <p>Discharged {entry.discharge?.date} - {entry.discharge?.criteria}</p>
                    <p>Diagnose by {entry.specialist}</p>
                    {'diagnosisCodes' in entry &&
                        <>
                        <h4>Diagnosis Codes</h4>
                        <ul>
                            {entry.diagnosisCodes?.map(code => (
                                <li key={code}>{code} - {diagnoses?.find((diagnosis: Diagnosis) => diagnosis.code === code)?.name}</li>
                            ))}
                        </ul>
                        </>
    
                    }
                </CardContent>
            </Card>
        );
    }
};

export const OccupationalEntry = ({ entry }: EntryBaseProps) => {
    // console.log('OccupationalEntry', entry);
    if ('employerName' in entry) {
        return(
            <Card key={entry.id} sx={{ marginBottom: '15px' }}>
                <CardContent>
                    <strong>{entry.date} <WorkIcon /> {entry.employerName}</strong>
                    <p>{entry.description}</p>
                    <p>Diagnose by {entry.specialist}</p>
                </CardContent>
            </Card>
        );
    }
};

export const HealthCheckEntry = ({ entry }: EntryBaseProps) => {
    // console.log('HealthCheckEntry', entry);
    if ('healthCheckRating' in entry) {
        const healthCheckRatingColor = () => {
            switch (entry.healthCheckRating) {
            case 0:
                return 'success';
            case 1:
                return 'info';
            case 2:
                return 'warning';
            case 3:
            default:
                return 'error';
            }
        };
        return (
            <Card key={entry.id} sx={{ marginBottom: '15px' }}>
                <CardContent>
                    <strong>{entry.date} <MedicalServicesIcon /></strong>
                    <p>{entry.description}</p>
                    <HeartIcon color={healthCheckRatingColor()} />
                    <p>Diagnose by {entry.specialist}</p>
                </CardContent>
            </Card>
        );
    }
};
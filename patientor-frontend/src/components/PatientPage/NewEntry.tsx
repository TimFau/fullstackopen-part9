import { Alert, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import patientsService from "./../../services/patients";
import { Entry, HealthCheckRating } from "../../types";

interface NewEntryProps {
    patientId: string,
    onNewEntry: (entry: Entry) => void
}

const NewEntry = ({ patientId, onNewEntry }: NewEntryProps) => {
    const [showForm, setShowForm] = useState(false);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);
        const entry = {
            description,
            date,
            specialist,
            diagnosisCodes: diagnosisCodes.split(',').map(code => code),
            healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
            type: 'HealthCheck' as const
        };
        patientsService.addPatientEntry(patientId, entry).then((response) => {
            console.log('response', response);
            setSuccess('Entry Added!');
            setDescription('');
            setDate('');
            setSpecialist('');
            setDiagnosisCodes('');
            setShowForm(false);
            onNewEntry(response as Entry);
            setTimeout(() => {
                setSuccess(null);
            }, 5000);
        }).catch((error) => {
            let errorMsg = error.response.data;
            if (errorMsg.includes('Something went wrong. Error:')) {
                errorMsg = errorMsg.split('Something went wrong. Error:')[1];
            }
            setError(errorMsg);
            setTimeout(() => {
                setError(null);
            }, 5000);
        });
    };

    return (
        <>
            <Box mb={2}>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
            </Box>
            {!showForm &&
            <Button variant="contained" onClick={() => setShowForm(true)}>Add New Entry</Button>
            }
            {showForm &&
                <>
                <Box component="form" display="flex" flexDirection="column" gap={2} onSubmit={handleSubmit}>
                    <TextField label="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <TextField label="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <TextField label="specialist" value={specialist} onChange={(e) => setSpecialist(e.target.value)} />
                    <TextField label="diagnosisCodes" helperText="Enter diagnosis codes, separated by a comma." value={diagnosisCodes} onChange={(e) => setDiagnosisCodes(e.target.value)} />
                    <TextField label="healthCheckRating" type="number" value={healthCheckRating} onChange={(e) => setHealthCheckRating(e.target.value)} />
                    <Box display="flex" justifyContent="space-between" >
                        <Button variant="outlined" onClick={() => setShowForm(false)}>Cancel</Button>
                        <Button variant="contained" type="submit">Submit</Button>
                    </Box>
                </Box>
                </>
            }
        </>
    );
};

export default NewEntry;
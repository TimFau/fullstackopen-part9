import { Alert, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import patientsService from "./../../services/patients";

interface NewEntryProps {
    patientId: string
}

const NewEntry = ({ patientId }: NewEntryProps) => {
    const [showForm, setShowForm] = useState(false);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const entry = { description, date, specialist, diagnosisCodes, healthCheckRating, type: 'HealthCheck' };
        console.log(patientId, entry);
        patientsService.addPatientEntry(patientId, entry).catch((error) => setError(error.response.data));
    };

    return (
        <>
            {!showForm &&
            <Button variant="contained" onClick={() => setShowForm(true)}>Add New Entry</Button>
            }
            {showForm &&
                <>
                {error && <Alert severity="error">{error}</Alert>}
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
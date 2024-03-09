import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import patientsService from "./../../services/patients";
import { Entry, EntryWithoutId, HealthCheckRating } from "../../types";

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
    const [type, setType] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);
        const entryBase = {
            description,
            date,
            specialist,
            diagnosisCodes: diagnosisCodes.split(',').map(code => code)
        };
        let entry: EntryWithoutId;
        switch (type) {
            case "HealthCheck":
                entry = {
                    healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
                    type: "HealthCheck" as const,
                    ...entryBase
                };
                break;
            case "OccupationalHealthcare":
                entry = {
                    employerName,
                    sickLeave: {
                        startDate: sickLeaveStartDate,
                        endDate: sickLeaveEndDate
                    },
                    type: "OccupationalHealthcare" as const,
                    ...entryBase
                };
                break;
                case "Hospital":
                    entry = {
                        discharge: {
                            date: dischargeDate,
                            criteria: dischargeCriteria
                        },
                        type: "Hospital" as const,
                        ...entryBase
                    };
                    break;
            default:
                return undefined;
        }
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
                    <FormControl>
                        <InputLabel id="type">Type</InputLabel>
                        <Select labelId="type" label="type" value={type} onChange={(e) => setType(e.target.value)}>
                            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
                            <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
                            <MenuItem value="Hospital">Hospital</MenuItem>
                        </Select>
                    </FormControl>
                    {type === "HealthCheck" &&
                        <TextField label="healthCheckRating" type="number" value={healthCheckRating} onChange={(e) => setHealthCheckRating(e.target.value)} />
                    }
                    {type === "OccupationalHealthcare" &&
                        <>
                            <TextField label="employerName" value={employerName} onChange={(e) => setEmployerName(e.target.value)} />
                            <span>Sick Leave</span>
                            <TextField label="startDate" type="date" value={sickLeaveStartDate} onChange={(e) => setSickLeaveStartDate(e.target.value)} sx={{ marginLeft: 2 }} />
                            <TextField label="endDate" type="date" value={sickLeaveEndDate} onChange={(e) => setSickLeaveEndDate(e.target.value)} sx={{ marginLeft: 2 }} />
                        </>
                    }
                    {type === "Hospital" &&
                        <Box display="flex" flexDirection="column" gap={2}>
                            <span>Discharge</span>
                            <TextField label="date" type="date" value={dischargeDate} onChange={(e) => setDischargeDate(e.target.value)} sx={{ marginLeft: 2 }} />
                            <TextField label="criteria" value={dischargeCriteria} onChange={(e) => setDischargeCriteria(e.target.value)} sx={{ marginLeft: 2 }} />
                        </Box>
                    }
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
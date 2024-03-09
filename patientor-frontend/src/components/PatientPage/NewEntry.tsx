import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
import patientsService from "./../../services/patients";
import { Entry, EntryWithoutId, HealthCheckRating, Diagnosis } from "../../types";

interface NewEntryProps {
    patientId: string,
    diagnoses: Diagnosis[],
    onNewEntry: (entry: Entry) => void
}

const NewEntry = ({ patientId, diagnoses, onNewEntry }: NewEntryProps) => {
    const [showForm, setShowForm] = useState(false);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [type, setType] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState<string | null>(null);

    const resetForm = () => {
        setDescription('');
        setDate('');
        setSpecialist('');
        setDiagnosisCodes([]);
        setType('');
        setHealthCheckRating('');
        setEmployerName('');
        setSickLeaveStartDate('');
        setSickLeaveEndDate('');
        setDischargeDate('');
        setDischargeCriteria('');
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);
        const entryBase = {
            description,
            date,
            specialist,
            diagnosisCodes
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
            resetForm();
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

    const handleSetDiagnosesCodes = (e: SelectChangeEvent<typeof diagnosisCodes>) => {
        const {
            target: { value }
        } = e;
        setDiagnosisCodes(
            typeof value === 'string' ? value.split(',') : value
        );
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
                    <TextField label="description" value={description} required onChange={(e) => setDescription(e.target.value)} />
                    <TextField label="date" type="date" value={date} required onChange={(e) => setDate(e.target.value)} InputLabelProps={{ shrink: true}}/>
                    <TextField label="specialist" value={specialist} required onChange={(e) => setSpecialist(e.target.value)} />
                    <FormControl>
                        <InputLabel id="type">Diagnoses</InputLabel>
                        <Select multiple value={diagnosisCodes} onChange={(e) => handleSetDiagnosesCodes(e)}>
                            {diagnoses.map((diagnosis) => (
                                <MenuItem key={diagnosis.code} value={diagnosis.code}>{diagnosis.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="type">Type</InputLabel>
                        <Select labelId="type" label="type" value={type} onChange={(e) => setType(e.target.value)}>
                            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
                            <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
                            <MenuItem value="Hospital">Hospital</MenuItem>
                        </Select>
                    </FormControl>
                    {type === "HealthCheck" &&
                        <FormControl>
                            <InputLabel id="type">HealthCheckRating</InputLabel>
                            <Select label="healthCheckRating" type="number" value={healthCheckRating} onChange={(e) => setHealthCheckRating(e.target.value)}>
                                <MenuItem value="0">Healthy</MenuItem>
                                <MenuItem value="1">Low Risk</MenuItem>
                                <MenuItem value="2">High Risk</MenuItem>
                                <MenuItem value="3">Critical Risk</MenuItem>
                            </Select>
                        </FormControl>
                    }
                    {type === "OccupationalHealthcare" &&
                        <>
                            <TextField label="employerName" value={employerName} onChange={(e) => setEmployerName(e.target.value)} />
                            <span>Sick Leave</span>
                            <TextField label="startDate" type="date" value={sickLeaveStartDate} onChange={(e) => setSickLeaveStartDate(e.target.value)} sx={{ marginLeft: 2 }} InputLabelProps={{ shrink: true}} />
                            <TextField label="endDate" type="date" value={sickLeaveEndDate} onChange={(e) => setSickLeaveEndDate(e.target.value)} sx={{ marginLeft: 2 }} InputLabelProps={{ shrink: true}} />
                        </>
                    }
                    {type === "Hospital" &&
                        <Box display="flex" flexDirection="column" gap={2}>
                            <span>Discharge</span>
                            <TextField label="date" type="date" value={dischargeDate} onChange={(e) => setDischargeDate(e.target.value)} sx={{ marginLeft: 2 }} InputLabelProps={{ shrink: true}} />
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
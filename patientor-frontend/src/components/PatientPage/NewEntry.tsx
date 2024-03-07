import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const NewEntry = () => {
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {

    };
    return (
        <>
            {!showForm &&
            <Button variant="contained" onClick={() => setShowForm(true)}>Add New Entry</Button>
            }
            {showForm &&
                <Box component="form" display="flex" flexDirection="column" gap={2} >
                    <TextField label="description"  />
                    <TextField label="date" type="date" />
                    <TextField label="specialist" />
                    <TextField label="diagnosisCodes" helperText="Enter diagnosis codes, separated by a comma." />
                    <TextField label="healthCheckRating" type="number" />
                    <Box display="flex" justifyContent="space-between" >
                        <Button variant="outlined" onClick={() => setShowForm(false)}>Cancel</Button>
                        <Button variant="contained" onClick={(event) => handleSubmit(event)}>Submit</Button>
                    </Box>
                </Box>
            }
        </>
    );
};

export default NewEntry;
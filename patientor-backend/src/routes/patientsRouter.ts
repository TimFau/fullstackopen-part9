import express from "express";
import patientService from "../services/patientService";
import pino from "pino";
import fs from "fs";
import { toNewPatient, toNewEntry } from "../utils";

const logger = pino({}, fs.createWriteStream("log.json", { flags: "a" }));

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
    res.send(patientService.getPatient(req.params.id));
});

router.post("/", (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        logger.info("Adding Patient");
        // logger.info(req.body);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post("/:id/entries", (req, res) => {
    try {
        const newEntry = toNewEntry(req.body);
        logger.info("Adding Entry");
        const addedEntry = patientService.addPatientEntry(req.params.id, newEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;
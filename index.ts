import express from "express";
import calculateBmi from "./bmiCalculator";

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    const result = calculateBmi(Number(height), Number(weight));
    if (result.includes("Error")) {
        res.status(400);
    }
    res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
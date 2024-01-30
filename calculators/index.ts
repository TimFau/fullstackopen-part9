import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
        response.status(400).json({ error: "parameters missing" });
        return null;
    }
    if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
        response.status(400).json({ error: "malformatted parameters" });
        return null;
    }
    for (let i = 0; i < daily_exercises.length; i++) {
        if (isNaN(Number(daily_exercises[i]))) {
            response.status(400).json({ error: "malformatted parameters" });
            return null;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(target, daily_exercises);
    response.json(result);
    return null;
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
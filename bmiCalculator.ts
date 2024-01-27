const calculateBmi = (height: number, weight: number) => {
    if (Number.isNaN(height) || Number.isNaN(weight)) {
        return  "Error: Must provide a height and weight"
    }
    const result = Number(((weight)  / (height * height) * 10000).toFixed(1))
    if (result < 18.5) {
        return "Underweight"
    }
    if (result <= 25) {
        return "Normal (healthy weight)"
    }
    if (result < 30) {
        return "Overweight"
    }
    return "Obese"
}

const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

console.log(calculateBmi(height, weight))

export default calculateBmi
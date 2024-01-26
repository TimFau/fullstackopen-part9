interface result {
    periodLength: Number,
    trainingDays: Number,
    success: Boolean,
    rating: Number,
    target: Number,
    ratingDescription: String
    averageTime: Number,
}

const calculateExercises = (target: Number, days: Array<Number>): (result | String) => {
    if (Number.isNaN(target)) return 'Target is required and must be a number'
    if (days.length < 1) return 'Days missing'
    const hasNaN = days.filter((day) => Number.isNaN(day)).length
    if (hasNaN) return 'Days must be numbers'

    const totalTime = days.reduce((accumulator, currentValue) => {
        return Number(accumulator) + Number(currentValue)
    }, 0)
    const trainingDays = days.filter((day) => Number(day) > 0).length
    const averageTime = Number(totalTime) / days.length
    const rating = () => {
        if (Number(averageTime) < Number(target) / 2) {
            return {
                score: 3,
                description: 'Better luck next week!'
            }
        }
        if (Number(averageTime) < Number(target)) {
            return {
                score: 2,
                description: 'Not too bad, but could be better.'
            }
        }
        if (Number(averageTime) >= Number(target)) {
            return {
                score: 1,
                description: 'Great job! You reached your goal.'
            }
        }
    }
    return {
        periodLength: days.length,
        trainingDays,
        success: Number(averageTime) >= Number(target),
        rating: rating().score,
        target: target,
        ratingDescription: rating().description,
        averageTime
    }
}

const target: Number = Number(process.argv[2])
const days: Array<Number> = []
for (let i = 3; i < process.argv.length; i++) {
    days.push(Number(process.argv[i]))
}

console.log(calculateExercises(target, days))
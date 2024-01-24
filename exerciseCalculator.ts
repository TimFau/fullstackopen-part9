interface result {
    periodLength: Number,
    trainingDays: Number,
    success: Boolean,
    rating: Number,
    target: Number,
    ratingDescription: String
    averageTime: Number,
}

const calculateExercises = (days: Array<Number>, target: Number): result => {
    console.log(days, target)
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

// const days: Array<Number> = JSON.parse(process.argv[2])
// const target: Number = Number(process.argv[3])

// console.log(process.argv)

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
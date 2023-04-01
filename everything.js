const everyLoop = (array, fn) => {
    for (item of array) {
        if (!fn(item)) return false
    }
    return true
}

const everyWithSome = (array, fn) => {
    return !array.some((value) => !fn(value))
}

const array = [1,2,3,4,5,6,7,8,9,10]

console.log(everyLoop(array, n => n < 11), everyWithSome(array, n => n < 11))
console.log(everyLoop(array, n => n < 10), everyWithSome(array, n => n < 10))
console.log(everyLoop(array, n => n > 0), everyWithSome(array, n => n > 0))
console.log(everyLoop(array, n => n > 1), everyWithSome(array, n => n > 1))
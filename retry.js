class RetryError extends Error {}

function retry (a, b) {
    if (Math.random() <= 0.2) {
        return a * b
    }

    throw new RetryError()
}

function wrapFunction () {
    try {
        return retry(2, 4)
    } catch (error) {
        console.log('error')
        if (error instanceof RetryError) return wrapFunction()
    }
}

console.log(wrapFunction())
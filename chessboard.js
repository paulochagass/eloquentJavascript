let str = ''
const isEven = (a) => a % 2 === 0
const isDivisible = (a, b) => a % b == 0
const size = 16

for(let a = 0; a < size; a++) {
    let [characterOne, characterTwo] = isEven(a) ? [' ', '#'] : ['#', ' ']
    for(let b = 0; b < size; b++) {
        str += isEven(b)? characterOne : characterTwo
    }
    str += '\n'
}

console.log(str)
/*
Deep comparison
The == operator compares objects by identity. But sometimes you’d
prefer to compare the values of their actual properties.
Write a function deepEqual that takes two values and returns true
only if they are the same value or are objects with the same properties,
where the values of the properties are equal when compared with a
recursive call to deepEqual.
To find out whether values should be compared directly (use the ===
operator for that) or have their properties compared, you can use the
typeof operator. If it produces "object" for both values, you should do a
deep comparison. But you have to take one silly exception into account:
because of a historical accident, typeof null also produces "object".
The Object.keys function will be useful when you need to go over the
properties of objects to compare them.
*/

function deepEqual(a,b) {
    const oneParameterIsNull = a === null | b === null
    const typeA = typeof a === 'object'
    const typeB = typeof b === 'object'
    const isTwoObjects = typeA && typeB
    const isTwoValues = !typeA && !typeB

    if (oneParameterIsNull || isTwoValues) {
        return a === b
    }

    if (isTwoObjects) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        const hasSameLength = keysA.length === keysB.length

        if (!hasSameLength) return false

        for (key of keysA) {
            const sameValue = a[key] === b[key]

            if (!sameValue) {
                return false
            }
        }

        return true
    }

    return false
}

console.log(deepEqual('teste', 'teste'))
console.log(deepEqual('teste', 'testee'))
console.log(deepEqual('teste', {foo: 'bar'}))
console.log(deepEqual({foo: 'bar'}, {foo: 'bar'}))
console.log(deepEqual({a: 'a', b: 'b', c: 'c'}, {a: 'a', b: 'b', c: 'c'}))
console.log(deepEqual({a: 'a', b: 'b', c: 'c'}, {a: 'a', b: 'b'}))
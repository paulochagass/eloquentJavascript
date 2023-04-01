/*
Flattening
Use the reduce method in combination with the concat method to “flatten” an array of arrays into a single array that has all the elements of
the original arrays.
*/

const flattening = (arrayOfArray) => arrayOfArray.reduce((acc, cur) => acc.concat(cur))

console.log(flattening([[1,2], [3,4], [5,6]]))
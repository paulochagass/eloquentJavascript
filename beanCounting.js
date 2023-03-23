/* 
You can get the Nth character, or letter, from a string by writing "string
"[N]. The returned value will be a string containing only one character
(for example, "b"). The first character has position 0, which causes the
last one to be found at position string.length - 1. In other words, a
two-character string has length 2, and its characters have positions 0
and 1.
Write a function countBs that takes a string as its only argument and
returns a number that indicates how many uppercase “B” characters
there are in the string.
Next, write a function called countChar that behaves like countBs,
except it takes a second argument that indicates the character that is
to be counted (rather than counting only uppercase “B” characters).
Rewrite countBs to make use of this new function.
*/

function countUpperLetter(string, letter) {
    let count = 0
    for (let i = 0; i < string.length; i++) {
        const loopLetter = string[i]
        const matchLetter = loopLetter === letter || loopLetter === letter.toUpperCase()
        const isUpperLatter = loopLetter === loopLetter.toUpperCase()
        const condition = matchLetter && isUpperLatter
        if (condition) count += 1 
    }
    console.log(count)
}

countUpperLetter('TesTe', 't')

function countUpperLetterRecursive(string, letter, index = 0, count = 0) {
    if (index >= string.length) {
      console.log(count)
      return count
    }
    
    const loopLetter = string[index]
    const matchLetter = loopLetter === letter || loopLetter === letter.toUpperCase()
    const isUpperLatter = loopLetter === loopLetter.toUpperCase()
    const condition = matchLetter && isUpperLatter
    
    if (condition) {
      count += 1
    }
    
    return countUpperLetterRecursive(string, letter, index + 1, count)
}
  
countUpperLetterRecursive('TesTe', 't')

/*
A List

Objects, as generic blobs of values, can be used to build all sorts of data structures.
A common data structure is the list (not to be confused with an array). 
A list is a nested set of objects, with the first object holding a reference to the second, the second to the third, and so on.

For example:

let list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};

A nice thing about lists is that they can share parts of their structure. 
For example, if we create two new values {value: 0, rest: list} and {value: -1, rest: list} (with list referring to the binding defined earlier),
they are both independent lists, but they share the structure that makes up their last three elements.
The original list is also still a valid three-element list.

Write a function arrayToList that builds up a list structure like the one shown when given [1, 2, 3] as argument.
Also write a listToArray function that produces an array from a list.
Then add a helper function prepend, which takes an element and a list and creates a new list that adds the element to the front of the input list,
and nth, which takes a list and a number and returns the element at the given position in the list (with zero referring to the first element)
or undefined when there is no such element.

If you haven’t already, also write a recursive version of nth.
*/

function arrayToList(array) {
  let obj = {}
  if (Array.isArray(array)) {
    let current = obj
    for(const value of array) {
      newObj = {
        value,
        rest: null
      }

      if (current.rest === undefined) {
        obj = newObj
      } else {
        current.rest = newObj
      }

      current = newObj
    }
  }
  return obj
}

console.log(JSON.stringify(arrayToList([1,2, 3, 4, 5])))

function listToArray(list) {
  let array = []
  while (list.rest) {
    array.push(list.value)
    list = list.rest
  }
  array.push(list.value)
  return array
}

console.log(listToArray(arrayToList([1,2, 3, 4, 5])))
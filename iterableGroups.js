const { Group } = require('./groups');

class IterableGroup extends Group{
    constructor() {
        super()
    }

    [Symbol.iterator]() {
        return new Iterable(this)
    }
}

class Iterable {
    constructor(iterableGroup) {
        this.index = 0;
        this.members = iterableGroup.members;
    }

    next () {
        const next = this.members[this.index++]

        if (!next) this.done = true

        this.value = next;

        return this
    }
}

const group = new IterableGroup().from([10, 20])

for (let value of group) {
    console.log(value)
}
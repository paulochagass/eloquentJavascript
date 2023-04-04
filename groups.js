class Group {
    constructor () {
        this.members = [];
    }

    add (value) {
        if (this.has(value)) return;

        this.members.push(value);
    }

    delete (value) {
        if (!this.has(value)) return;

        this.members.filter(member => member !== value);
    }

    has (value) {
        this.members.includes(value);
    }

    from (iterable) {
        for (let value of iterable) {
            this.add(value);
        }

        return this;
    }
}

module.exports = {
    Group
}
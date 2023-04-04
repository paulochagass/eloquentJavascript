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
        const group = new Group;

        for (value of iterable) {
            group.add(value);
        }

        return group;
    }
}
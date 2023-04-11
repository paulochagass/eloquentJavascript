const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");

        return this._content;
    }
};

function withBoxUnlocked (callback) {
    box.unlock();
    try{
        callback();
    } catch(e) {
        console.log(e.message)
    }
    box.lock();
}

withBoxUnlocked(() => console.log(box.content))
withBoxUnlocked(() => { throw new Error('teste') })
withBoxUnlocked(() => box._content.push('item'))
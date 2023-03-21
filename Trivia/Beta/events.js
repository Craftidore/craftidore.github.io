// Contains logic for events & state modules

;((global) => {
    let M = {};
    let events = {};

    class event {
        constructor(name, onUpdateList) {
            this._name = name;
            this._onUpdate = onUpdateList;
            this.post = null;
        }
        addListener(onUpdate) {
            this._onUpdate.push(onUpdate);
        }
        addPost(post) {
            this.post = post;
        }
        broadcast() {
            for (let func of this._onUpdate) {
                func();
            }
            if (this.post !== null && this.post !== undefined) {
                M.broadcastEvent(this.post);
            }
        }
    }

    M.registerEvent = (name, onUpdate = console.log, post = null) => {
        console.log(events);
        if (events[name] === null || events[name] === undefined) {
            events[name] = new event(name, [onUpdate], post);
        }
        else {
            events[name].addListener(onUpdate);
        }
    }

    M.onPost = (name, event) => {
        events[name].addPost(event);
    }

    M.broadcastEvent = (name) => {
        if (events[name] !== null && events[name] !== undefined) {
            events[name].broadcast();
        }
    }

    Object.defineProperty(M, "events", { 
        get: () => Object.keys(events)
    });

    global.events = M;
})(window);

((global) => {
    let M = {};
    let state = {};
    let broadcast = {};

    M.registerState = (name, onChange = null, initialValue = null) => {
        state[name] = initialValue;
        broadcast[name] = onChange;
        Object.defineProperty(M, name, {
            get: () => state[name],
            set: (newVal) => {
                state[name] = newVal;
                if (broadcast[name] !== null && broadcast[name] !== undefined) {
                    events.broadcastEvent(broadcast[name]);
                }
            }
        });
    }

    M.setOnChange = (name, onChange) => {
        if (M[name] !== undefined) {
            broadcast[name] = onChange;
        } 
        else {
            throw RangeError(`State ${name} does not exist.`);
        }
    }

    Object.defineProperty(M, "states", {
        get: () => Object.keys(state)
    });

    global.state = M;
})(window);


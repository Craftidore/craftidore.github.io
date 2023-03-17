// Contains logic for events & state modules

((global) => {
    let M = {};

    class event {
        constructor(name, onUpdateList) {
            this._name = name;
            this._onUpdate = onUpdateList;
        }
        addListener(onUpdate) {
            this._onUpdate.push(onUpdate);
        }
        broadcast() {
            for (let func of this._onUpdate) {
                func();
            }
        }
    }

    let events = {};

    M.registerEvent = (name, onUpdate = console.log) => {
        console.log(events);
        if (events[name] === null || events[name] === undefined) {
            events[name] = new event(name, [onUpdate]);
        }
        else {
            events[name].addListener(onUpdate);
        }
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

    M.registerState = (name, onChange, initialValue) => {
        state[name] = initialValue; // if parameter undefined, undefined
        Object.defineProperty(M, name, {
            get: () => state[name],
            set: (newVal) => {
                state[name] = newVal;
                if (onChange !== null) {
                    events.broadcastEvent(onChange);
                }
            }
        });
    }

    M.is = (name, value) => {
        return state[name] === value;
    }

    M.current = (name) => {
        return state[name];
    }

    Object.defineProperty(M, "states", {
        get: () => Object.keys(state)
    });

    global.state = M;
})(window);


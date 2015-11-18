function PubSub() {
    function where(arr, value) {

    }


    var subscription = [];

    this.subscribe = (event, fn) => {
        if (typeof subscription[event] !== 'undefined') {

        }
        subscription[event] = fn;
    }

    this.publish = (event, ...rest) => {
        if (typeof subscription[event] !== 'function') {
            console.warn(`Don't have subscribers`, subscription);
            return;
        }

        subscription[event].call(null, ...rest)
    }
}

const pubSub = new PubSub();

export default pubSub;
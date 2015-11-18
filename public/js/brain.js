

const mooods = {
    1: "Bad",
    2: "SoSo",
    3: "Good"
};

function randomRange(min, max) {
    return ~~(Math.random() * (max - min + 1)) + min
}

function Brain(type, character) {
    this.type = type;
    this.char = character;

    setTimeout(function switchOnBrain(){
        var mood = randomRange(1,3);

        console.log(this.char);
        var actions = {
            "Bad": {
                action: () => {

                },
                dreaminess: 4000
            },
            "SoSo": {
                action: () => {

                },
                dreaminess: 3000
            },
            "Good": {
                action: () => {

                },
                dreaminess: 1500
            }
        }

        setTimeout(switchOnBrain.bind(this), actions[mooods[mood]].dreaminess);
    }.bind(this), 4000)
}


export default Brain;
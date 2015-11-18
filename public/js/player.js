import characterMap from '../character.json';
import pubSub from './pubSub';

const keyCodes = {
    39: "RIGHT",
    37: "LEFT",
    38: "TOP",
    40: "BOTTOM"
};

const keyFramePosition = {
    // walk position
    0: 0,
    1: 31,
    2: 65,
    3: 98,
    4: 127,
    5: 161,
    6: 188,
    // fight position
    7: 220,
    8: 256,
    9: 288,
    10: 316,
    11: 348,
    12: 381,
    13: 412,
    14: 442,
    15: 476,
    16: 509
};

function Player() {
    const setKeyFramePosition = (x = 0) => {
        this.player.style.backgroundPositionX = `-${x}px`;
    };

    const setPosition = (x, y, rotate = 0) => {
        this.player.style.transform = `translate(${x}px, ${y}px) rotateY(${rotate}deg)`;
    }

    this.player = null;

    const walk = () => {
        let rotate = 0;

        switch (this.side) {
            case "RIGHT":
                this.xPos = this.xPos + this.speed;
                rotate = 0;
                break;
            case "LEFT":
                this.xPos = this.xPos - this.speed;
                rotate = -180;
                break;
            case "TOP":
                this.yPos = this.yPos - this.speed;
                rotate = -180;
                break;
            case "BOTTOM":
                this.yPos = this.yPos + this.speed;
                rotate = 0;
                break;
            default:
                return false;
                break;
        };

        pubSub.publish('changePlayerPosition', this.speed, this.side);

        setKeyFramePosition(keyFramePosition[walk.step]);
        setPosition(this.xPos, this.yPos, rotate);

        walk.step = walk.step === 6 ? 0 : walk.step + 1;
    };

    walk.step = 0;

    const fight = () => {
        var step = 7;
       setTimeout(function fightDelay() {
           setKeyFramePosition(keyFramePosition[step])
           step++;

           if (step < 17) {
               setTimeout(fightDelay, 100);
           }
       }, 100)
    }

    document.addEventListener('keydown', (e) => {
        if (~[37, 38, 39, 40].indexOf(e.keyCode)) {
            this.side = keyCodes[e.keyCode];
            walk();
        }

        if (e.keyCode === 32) {
            fight()
        }
    })

    this.init = (x, y, container) => {
        const el = document.createElement('div');
        const imgPath = `/public/sprite/${characterMap.player.sprite}`;

        el.className = "Player";
        el.style.backgroundImage = `url(${imgPath})`;

        this.xPos = x;
        this.side = 'RIGHT';
        this.yPos = y;
        this.speed = 4;


        this.player = el;

        setPosition(this.xPos, this.yPos);

        container.appendChild(el);
    };
}

export default new Player();
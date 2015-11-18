import pubSub from './pubSub';
import Brain from './brain';

// Character statuses:
// - born
// - exist
// - die
//

function Character(obj, container) {
    this.obj = obj;
    this.status = "born";
    this.side = "RIGHT";
    this.brain = new Brain('animal', obj);



    this.actions = {
        changeGif(gif){
            this.el.appendChild(gif)
        },
        still: () => {
            this.actions.changeGif.bind(this)(this.obj.gif[this.side.toLowerCase()]['still']);
        },
        die: () => {

        },
        attack: () => {

        },
        rotate: () => {
            this

            this.el.style.transform = 'transform: rotateZ(186deg) rotateX(160deg)';
        },
        walk: () => {
            this.changeGif(this.obj.gif[this.rotate || 'right']['run']);

            let rotate = 0;

            switch (this.side) {
                case "RIGHT":
                    this.obj.startPos.x = this.obj.startPos.x + this.obj.speed;
                    rotate = 0;
                    break;
                case "LEFT":
                    this.obj.startPos.x = this.obj.startPos.x - this.obj.speed;
                    rotate = -180;
                    break;
                case "TOP":
                    this.obj.startPos.y = this.obj.startPos.y - this.obj.speed;
                    rotate = -180;
                    break;
                case "BOTTOM":
                    this.obj.startPos.y = this.obj.startPos.y + this.obj.speed;
                    rotate = 0;
                    break;
                default:
                    return false;
                    break;
            };

            let zIndex = this.obj.startPos.y;

            pubSub.publish('changePlayerPosition', this.speed, this.side);

            setPosition(this.obj.startPos.x, this.obj.startPos.y, rotate);
        }
    }

    const setPosition = (x, y, rotate = 0) => {
        this.el.style.transform = `translate(${x}px, ${y}px) rotateY(${rotate}deg)`;
    };

    const render = () => {
        this.actions.still();
        container.appendChild(this.el);
        this.status = 'exist';
    };

    const createGifSprites = (gif) => {
        const sides = Object.keys(gif);

        for (let side of sides) {
            let states = Object.keys(gif[side]);

            for (let state of states) {
                let tempGif = document.createElement('img');

                tempGif.src = gif[side][state];

                gif[side][state] = tempGif;
            }
        }
    };

    this.el = document.createElement('i');

    this.el.className = `Character Character-${this.obj.name}`;

    this.obj.startPos && setPosition(this.obj.startPos.x, this.obj.startPos.y);

    if (this.obj.gif) {
        createGifSprites(this.obj.gif)
        render();
    }


}

export default Character;
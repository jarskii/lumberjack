import pubSub from './pubSub';
import preloader from './preloader';


function Background() {
    this.position = {
        x: 500,
        y: 700
    };

    const moveThePlayer = function(speed, side) {
        if (
            this.position.x >= 0
            &&
            this.position.x < this.size.width
            &&
            this.position.y >= 0
            &&
            this.position.y < this.size.height
        ) {
            switch (side) {
                case "RIGHT":
                    this.position.x = this.position.x + speed;
                    break;
                case "LEFT":
                    this.position.x = this.position.x - speed;
                    break;
                case "TOP":
                    this.position.y = this.position.y - speed;
                    break;
                case "BOTTOM":
                    this.position.y = this.position.y + speed;
                    break;
                default:
                    return false;
                    break;
            };

            setPosition();
        }
    }.bind(this);

    const setPosition = function() {
        this.el.style.left = `-${this.position.x}px`;
        this.el.style.top = `-${this.position.y}px`;
    }.bind(this);

    this.init = (container) => {
        this.el = document.createElement('div');

        const bgImage = document.createElement('img');
        const imgPath = '/public/img/map.jpg';

        this.el.id = "background";
        this.el.className = "Background";

        bgImage.src = imgPath;

        bgImage.onload = () => {
            this.el.style.backgroundImage = `url(${imgPath})`;

            setPosition();

            container.appendChild(this.el);

            // Add background size
            this.size = {
                width: this.el.offsetWidth,
                height: this.el.offsetHeight
            };

            preloader.hide();
        }

        pubSub.subscribe('changePlayerPosition', moveThePlayer.bind(this));
    }
};


export default new Background();
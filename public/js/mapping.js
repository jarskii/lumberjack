import mapStructure from '../maps/map.json';

import sha256 from './lib/sha256';

function Map(structure) {
    this.struct = structure;
    this.collision = [];

    // List(key, value) of plants, npc, stones ....
    this.objs = {};

    const setPosition = function(el, obj) {
        el.style.transform = `translate(${obj.position.x}px, ${obj.position.y}px)`;
    }.bind(this);

    this.makeObj = (obj) => {
        const el = document.createElement('i');

        const hash = sha256.hash([] + new Date().getTime()*Math.random()).substr(0, 9);
        const id = `${obj.type}_${hash}`;

        el.id = id;
        el.className = `Object Object-${obj.type}`;

        this.objs[id] = {
            el: el,
            position: obj.position
        };

        if (obj.collision) {
            this.collision.push()
        }

        setPosition(el, obj);

        return el;
    }

    this.init = (container) => {
        const mapEl = document.createElement('div');
        const tempContainer = document.createDocumentFragment();

        mapEl.id = "map";
        mapEl.className = "Map";

        this.struct.objects.forEach((obj) => {
            tempContainer.appendChild(this.makeObj(obj));
        })

        mapEl.appendChild(tempContainer);
        container.appendChild(mapEl);
        this.el = mapEl;
    }
}


export default new Map(mapStructure)
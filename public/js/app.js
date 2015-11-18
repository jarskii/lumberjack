import Character from  './character';
import player from './player';
import background from './background';
import mapping from './mapping';
import preloader from './preloader';

import pubSub from './pubSub';

import enemiesJson from '../maps/enemies.json';

function Game(container) {
    this.container = container;

    this.enemies = []
    // Generate initial DOM
    this.makeEnemies = (enemyList) => {
        for (let enemy of enemyList) {
            this.enemies.push(new Character(enemy, mapping.el));
        }
    };

    (() => {
        preloader.show();

        background.init(this.container);

        mapping.init(background.el);

        player.init(500, 300, this.container);

        this.makeEnemies(enemiesJson.list)
    })()
}

new Game(document.getElementById('app'))



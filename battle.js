(function () {
    "use strict";

    function Player(name, weapons) {
        this.name = name;
        this.health = 10;
        this.strength = 2;
        this.weapons = weapons;
    }

    function Weapon(name) {
        this.name = name;
        // Damage is calculated by generating a random number between 1 and 5.
        this.damage = Math.floor(Math.random() * (Math.floor(5) - Math.ceil(1) + 1)) + Math.ceil(1);
    }

    function Enemy() {
        this.name = "Enemy";
        this.health = 5;
        this.strength = 2;
    }

    function BattleSimulation() {
        this.players = [];
        this.enemies = [];
    }

    Player.prototype.applyDamage = function (damage) {
        this.damage = damage;
        this.health -= this.damage;
    };

    Player.prototype.isAlive = function () {
        if (this.health > 0) {
            return true;
        } else {
            return false;
        }
    };

    Player.prototype.attackWith = function () {
        // Return a random weapon from the weapons cache by returning a random number between 0 and 7.
        return this.weapons[Math.floor(Math.random() * Math.floor(8) - Math.ceil(0)) + Math.ceil(0)];
    };

    Enemy.prototype.applyDamage = function (damage) {
        this.damage = damage;
        this.health -= this.damage;
    };

    Enemy.prototype.isAlive = function () {
        if (this.health > 0) {
            return true;
        } else {
            return false;
        }
    };

    Enemy.prototype.attack = function (player) {
        this.player = player;
        this.player.applyDamage(this.strength);
    };

    Weapon.prototype.attack = function (player, enemy) {
        this.player = player;
        this.enemy = enemy;

        let pAlive = this.player.isAlive();
        let eAlive = this.enemy.isAlive();

        while (pAlive && eAlive) {
            let damage = this.player.strength * this.damage;
            this.enemy.applyDamage(damage);
            eAlive = this.enemy.isAlive();
            this.enemy.attack(this.player);
            pAlive = this.player.isAlive();
        }
    };

    BattleSimulation.prototype.createEnemies = function () {
        for (let cnt = 0; cnt < 20; cnt++) {
            let enemy = new Enemy();
            this.enemies.push(enemy);
        }
    };

    BattleSimulation.prototype.createPlayers = function () {
        let katana = new Weapon("Katana");
        let nodachi = new Weapon("Nodachi");
        let shuriken = new Weapon("Shuriken");
        let bat = new Weapon("Bat");
        let handgun = new Weapon("Handgun");
        let persona = new Weapon("Persona");
        let whip = new Weapon("Whip");
        let moonLight = new Weapon("Moonlight Greatsword");

        let weaponsCache = [katana, nodachi, shuriken, bat, handgun, persona, whip, moonLight];

        let player1 = new Player("Alex", weaponsCache);
        let player2 = new Player("Ariel", weaponsCache);
        let player3 = new Player("Marilyn", weaponsCache);
        let player4 = new Player("Austin", weaponsCache);
        let player5 = new Player("Jay", weaponsCache);

        this.players.push(player1, player2, player3, player4, player5);
    };

    BattleSimulation.prototype.run = function () {
        console.log("\nSimulating Battle\n");

        this.createEnemies();
        this.createPlayers();

        let deadHeroes = 0;
        let deadEnemies = 0;

        // This loop will run until one side is completely wiped out.
        do {
            // Assign a random player and a random enemy each to a variable to have them fight!
            let good = this.players[Math.floor(Math.random() * Math.floor(4) - Math.ceil(0)) + Math.ceil(0)];
            let evil = this.enemies[Math.floor(Math.random() * Math.floor(19) - Math.ceil(0)) + Math.ceil(0)];
            // Assign a random weapon from the cache to use in combat.
            let weapon = good.attackWith();
            // Call the weapon's attack function using the 2 random variables made earlier.
            weapon.attack(good, evil);

            // If the player died add one to deadHeroes, but if the enemy died add one to deadEnemies.
            if (!good.isAlive()) {
                deadHeroes++;
            } else if (!evil.isAlive()) {
                deadEnemies++;
            }
        } while (deadHeroes < this.players.length && deadEnemies < this.enemies.length);

        console.log("These players survived!\n");

        // This will check deadHeroes and deadEnemies to let you know what the endgame state is.
        // If any of your players survived then you win!
        if (deadHeroes === this.players.length) {
            console.log("None...");
            console.log("\nSorry, Scarlet Byte has defeated you and conquered the free world.");
        } else if (deadEnemies === this.enemies.length) {
            for (let cnt = 0, heroes = this.players.length; cnt < heroes; cnt++) {
                if (this.players[cnt].isAlive())
                    console.log(this.players[cnt].name);
            }
            console.log("\nCongratulations, you have defated Scarlet Byte!!");
        }

    };

    let sim = new BattleSimulation();

    sim.run();
}());

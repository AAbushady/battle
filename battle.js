/*global console*/
/*jshint esversion: 6*/

(function () {
    "use strict";

    function Player(name, weapons) {
        this.name = name;
        this.health = 10;
        this.strength = 2;
        this.weapons = weapons;
    }

    function Weapons(name) {
        this.name = name;
        this.damage = (Math.random() * 5) + 1;
    }

    function Enemy() {
        this.name = "Enemy";
        this.health = 5;
        this.strength = 2;
    }

    function BattleSimulation(players, enemies) {
        this.players = players[];
        this.enemies = enemies[];
    }
}());

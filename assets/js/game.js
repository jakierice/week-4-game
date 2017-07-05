// define characters object for each Eagles band member
var eagles = {
    glennFrey: {
        name: "Glenn Frey",
        health: 120,
        attack: 15,
        counter: 25,
        pic: "assets/images/glenn_frey.jpg"
    },
    donHenley: {
        name: "Don Henley",
        health: 100,
        attack: 20,
        counter: 30,
        pic: "assets/images/don_henley.jpg"
    },
    joeWalsh: {
        name: "Joe Walsh",
        health: 80,
        attack: 10,
        counter: 20,
        pic: "assets/images/joe_walsh.jpg"
    },
    donFelder: {
        name: "Don Felder",
        health: 140,
        attack: 5,
        counter: 15,
        pic: "assets/images/don_felder.jpg"
    }
}

// define game instructions object
var instructions = {
    first: "Choose your character",
    second: "Choose your first enemy",
    third: "ATTACK!",
    fourth: "Choose your next enemy",
    fifth: "Choose your last enemey"
}

var fighters = {};
var remainingEnemies = {};

var ui = {
    instructionsHolder: $('#instructions'),
    instructionText: $('<h1></h1>'),
    gameArea: $('#gameArea'),
    attackerHolder: $('<div class="col-xs-12 col-sm-3" id="chosenEagle"></div>'),
    attackerTitle: $('<div class="row title" id="attackerTitle"><h3>Attacker</h3></div>'),
    enemiesHolder: $('<div class="col-xs-12 col-sm-6" id="enemiesHolder"></div>'),
    enemiesTitle: $('<div class="row title" id="enemiesTitle"><h3>Enemies</h3></div>'),
    vs: $('<div class="col-xs-12 col-sm-3" id="vs"><h2>VS</h2></div>'),
    currentEnemy: $('<div class="row" id="currentEnemy"></div>'),
    attackButton: $('<button class="btn col-xs-12" id="attackButton">ATTACK!</button>'),
    remainingTitle: $('<div class="row title" id="remainingTitle"><h6>Enemies Left</h6></div>'),
    remainingEnemies: $('<div class="row" id="remainingEnemies"></div>'),
    // attackerHealth: $('<div class="col-xs-12" id="attackerHealth"><h2>Health: ' + fighters.attacker.health + '</h2></div>'),
    // attackerAttack: $('<div class="col-xs-12" id="attackerAttack"><h2>Attack Power: ' + fighters.attacker.attack + '</h2></div>'),
    // defenderStats: $('<div class="col-xs-7" id="defenderStats"><h1>Stats</h1></div>'),
    // defenderHealth: $('<div class="col-xs-12" id="defenderHealth"><h2>Health: ' + fighters.defender.health + '</h2></div>'),
    // defenderCounter: $('<div class="col-xs-12" id="defenderCounter"><h2>Counter Attack ' + fighters.defender.counter + '</h2></div>'),
}

var battle = {
    listEagles: function () {
        ui.instructionsHolder.append(ui.instructionText)
        ui.instructionText.html(instructions.first);

        $.each(eagles, function (eagle, info) {
            console.log(info.health);

            var character = {
                holder: $('<div class="col-xs-6 col-sm-offset-0 col-sm-3"></div>'),
                name: $('<h1></h1>'),
                health: $('<h5>HP: </h5>'),
                pic: $('<img>')
            }

            character.name.append(info.name)
                .attr('id', eagle + 'Name');
            character.health.append(info.health);
            character.pic.attr('src', info.pic);

            character.holder.append(
                character.name,
                character.health,
                character.pic
            )

            ui.gameArea.append(
                character.holder
            );

        })

    },
    chooseAttacker: function () {

    },
    addAttackerStats: function () {

    },
    listEnemies: function () {

    },
    chooseDefender: function () {

    },
    listRemainingEnemies: function () {

    },
    attack: function () {

    },
    lose: function () {

    },
    win: function () {

    }
}

function eaglesBattle() {
    listEagles();
}

$(document).ready(function () {
    // chooseEagle();
    battle.listEagles();
});
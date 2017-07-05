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
    defenderHolder: $('<div class="row" id="defenderHolder"></div>'),
    attackButton: $('<button class="btn col-xs-12" id="attackButton">ATTACK!</button>'),
    remainingTitle: $('<div class="row title" id="remainingTitle"><h6>Enemies Left</h6></div>'),
    remainingEnemies: $('<div class="row" id="remainingEnemies"></div>'),
    attackerHealth: $('<div class="col-xs-12" id="attackerHealth"><h2>Health: </h2></div>'),
    attackerAttack: $('<div class="col-xs-12" id="attackerAttack"><h2>Attack Power: </h2></div>'),
    defenderStats: $('<div class="col-xs-7" id="defenderStats"><h1>Stats</h1></div>'),
    defenderHealth: $('<div class="col-xs-12" id="defenderHealth"><h2>Health: </h2></div>'),
    defenderCounter: $('<div class="col-xs-12" id="defenderCounter"><h2>Counter Attack </h2></div>'),
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
            character.health.append(info.health)
                .attr('id', eagle + 'Health');
            character.pic.attr('src', info.pic)
                .attr('id', eagle + 'Pic')
                .click(function () {
                    fighters['attacker'] = info;
                    battle.setupAttacker(eagle);
                    battle.listAllEnemies(eagle);
                });

            character.holder.append(
                character.name,
                character.health,
                character.pic
            ).attr('id', eagle + 'Holder');

            ui.gameArea.append(
                character.holder
            );
        })
    },
    setupAttacker: function (attacker) {
        // console.log(attacker);
        ui.instructionText.html(instructions.second);

        ui.gameArea.append(ui.attackerHolder);
        ui.attackerHolder.append(ui.attackerTitle)
        $('#' + attacker + 'Pic').off();
        $.each(eagles, function (eagle, info) {
            if (attacker === eagle) {

                $('#' + eagle + 'Holder')
                    .appendTo(ui.attackerHolder);

                $('#' + eagle + 'Holder')
                    .removeClass()
                    // .addClass('col-xs-offset-3 col-xs-6 col-sm-offset-0 col-sm-12');
                    .addClass('col-xs-offset-2 col-xs-8 col-sm-offset-0 col-sm-12');

                $('#' + eagle + 'Health').hide();
                ui.attackerHolder.append(ui.attackerHealth);
                ui.attackerHolder.append(ui.attackerAttack);
                ui.attackerHealth.html('<h2>Health: ' + fighters.attacker.health + '</h2>');
                ui.attackerAttack.html('<h2>Attack: ' + fighters.attacker.counter + '</h2>');
            };
        });
        ui.gameArea.append(ui.vs);
        ui.vs.append(ui.attackButton);
    },
    listAllEnemies: function (attacker) {
        console.log(attacker);
        ui.gameArea.append(ui.enemiesHolder);
        ui.enemiesHolder.append(ui.enemiesTitle);
        $.each(eagles, function (enemy, info) {
            if (enemy !== attacker) {
                // console.log(enemy);
                $('#' + enemy + 'Pic').off()
                    .click(function () {
                        fighters['defender'] = info;
                        battle.setupDefender(enemy);
                        battle.listRemainingEnemies(enemy, attacker);
                    })
                $('#' + enemy + 'Holder').removeClass()
                    .addClass('col-xs-4');
                $('#' + enemy + 'Holder').appendTo(ui.enemiesHolder);
            }
        })
    },
    setupDefender: function (defender) {
        $('#' + defender + 'Holder').appendTo(ui.defenderHolder)
            .removeClass()
            .addClass('col-xs-offset-1 col-xs-4');
        ui.enemiesHolder.append(ui.defenderHolder);
        ui.defenderHolder.append(ui.defenderStats);
        ui.defenderStats.append(ui.defenderHealth);
        ui.defenderStats.append(ui.defenderCounter);
        ui.defenderHealth.html('<h2>Health: ' + fighters.defender.health + '</h2>');
        ui.defenderCounter.html('<h2>Counter: ' + fighters.defender.counter + '</h2>');
    },
    listRemainingEnemies: function (defender, attacker) {
        console.log(attacker);
        console.log(defender);
        // console.log(defender);
        ui.enemiesHolder.append(ui.remainingEnemies);
        var enemies = [];
        $.each(eagles, function (eagle, info) {
            $('#' + eagle + 'Pic').off();
            if (defender !== eagle && attacker !== eagle) {
                enemies.push(eagle);
                console.log(enemies);
                $('#' + eagle + 'Health').hide();
                $('#' + eagle + 'Holder').appendTo(ui.remainingEnemies)
                    .removeClass()
                    .addClass('col-xs-offset-2 col-xs-3');
            }
        })
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
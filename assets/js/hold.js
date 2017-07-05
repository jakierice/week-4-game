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

// create empty array for storing enemies
var enemies = [];

var fighters = {};

function chooseEagle() {

    $('#instructions').append('<h1>' + instructions.first + '</h1>');

    $.each(eagles, function (eagle, info) {
        var character = {
            holder: $('<div class="col-xs-6 col-sm-offset-0 col-sm-3" id="' + eagle + 'Holder"></div>'),
            name: $('<h1 id=' + eagle + 'Name></h1>'),
            health: $('<h5 id=' + eagle + 'Health>HP: ' + info.health + '</h5>'),
            pic: $('<img>')
        }

        character.name.append(
            info.name,
            character.health
        )

        character.pic
            .attr('src', info.pic)
            .attr('id', eagle + 'Pic')
            .click(function () {
                setupFight(eagle);
                fighters['attacker'] = info;
                addAttackerStats();
            });

        character.holder.append(
            character.name,
            character.pic
        )

        $('#characters').append(character.holder);
    })
}

function setupFight(chosenEagle) {
    console.log(chosenEagle);

    $('#instructions')
        .empty()
        .append('<h1>' + instructions.second + '</h1>');

    var attackerHolder = $('<div class="col-xs-12 col-sm-3" id="chosenEagle"></div>');
    var attackerTitle = $('<div class="row title" id="attackerTitle"><h3>Attacker</h3></div>');

    attackerHolder.append(attackerTitle);

    // create title and holding area for enemy choices
    var enemiesHolder = $('<div class="col-xs-12 col-sm-6" id="enemiesHolder"></div>');
    var enemiesTitle = $('<div class="row title" id="enemiesTitle"><h3>Enemies</h3></div>');

    // enemiesHolder.addClass('col-xs-12 col-sm-6')
    enemiesHolder.append(enemiesTitle);

    // create VS tag to seperate selected character and enemies
    var vs = $('<div class="col-xs-12 col-sm-3" id="vs"><h2>VS</h2></div>');

    // add VS seperator and enemies area to characters box
    $('#characters').append(
        attackerHolder,
        vs,
        enemiesHolder
    );

    $.each(eagles, function (eagle, info) {
        // remove setupFight() click function from eagle pic
        $('#' + eagle + 'Pic').off();

        // reformat selected character's holder and add attack power
        if (chosenEagle === eagle) {
            $('#' + eagle + 'Holder')
                .appendTo(attackerHolder);

            $('#' + eagle + 'Holder')
                .removeClass()
                .addClass('col-xs-offset-3 col-xs-6 col-sm-offset-0 col-sm-12');

            $('#' + eagle + 'Health').hide();
            // add non-selected characters to new enemiesHolder area of page
        } else {
            enemies.push(eagle);
            $('#' + eagle + 'Holder')
                .appendTo(enemiesHolder)
                // remove old layout
                .removeClass()
                // add new layout
                .addClass('col-xs-4');

            // add new chooseEnemy() function to all enemies' pictures
            $('#' + eagle + 'Pic').click(function () {
                fighters['defender'] = info;
                chooseEnemy(eagle, enemies);
            });
        }
    });
}

function chooseEnemy(chosenEnemy, enemies) {
    $('#instructions')
        .empty()
        .append('<h1>' + instructions.third + '</h1>');

    var currentEnemy = $('<div class="row" id="currentEnemy"></div>');
    var attackButton = $('<button class="btn col-xs-12" id="attackButton">ATTACK!</button>');
    attackButton.click(function () {
        fight();
    })

    $('#vs').append(attackButton);

    $('#enemiesHolder').append(currentEnemy);

    var remainingTitle = $('<div class="row title" id="remainingTitle"><h6>Enemies Left</h6></div>');
    var remainingEnemies = $('<div class="row" id="remainingEnemies"></div>');
    $('#enemiesHolder').append(
        remainingTitle,
        remainingEnemies
    );

    $.each(enemies, function (index, enemy) {
        $('#' + enemy + 'Pic').off();

        if (enemy === chosenEnemy) {
            $('#' + enemy + 'Holder').appendTo(currentEnemy);
            $('#' + enemy + 'Holder')
                .removeClass()
                .addClass('col-xs-5');
            $('#' + enemy + 'Health').hide();
            addDefenderStats();
        } else {
            $('#' + enemy + 'Name').hide();
            $('#' + enemy + 'Health').hide();
            $('#' + enemy + 'Holder')
                .appendTo(remainingEnemies)
                .removeClass()
                .addClass('col-xs-offset-2 col-xs-3 remain');
        }
    });
};

function addAttackerStats() {
    var attackerHealth = $('<div class="col-xs-12" id="attackerHealth"><h2>Health: ' + fighters.attacker.health + '</h2></div>');
    var attackerAttack = $('<div class="col-xs-12" id="attackerAttack"><h2>Attack Power: ' + fighters.attacker.attack + '</h2></div>');
    $('#chosenEagle').append(
        attackerHealth,
        attackerAttack
    );
};

function addDefenderStats() {

    var defenderStats = $('<div class="col-xs-7" id="defenderStats"><h1>Stats</h1></div>');
    $('#currentEnemy').append(defenderStats);
    var defenderHealth = $('<div class="col-xs-12" id="defenderHealth"><h2>Health: ' + fighters.defender.health + '</h2></div>');
    var defenderCounter = $('<div class="col-xs-12" id="defenderCounter"><h2>Counter Attack ' + fighters.defender.counter + '</h2></div>');
    defenderStats.append(
        defenderHealth,
        defenderCounter
    );

};

function chooseNewEnemy(defeatedEnemy) {
    var remainingEnemies = [];
    // console.log(fighters);
    // console.log(defeatedEnemy);
    // $.each(eagles, function(eagle, info){
    //     if (defeatedEnemy === info.name) {
    //         $('#' + eagle + 'Holder').hide();
    //     } else {
    //         enemies.push(eagle);
    //         console.log(enemies);
    //     }
    // })
    // console.log(fighters);
    // console.log(defeatedEnemy);
    // $.each(eagles, function (eagle, info) {
    //     if (fighters.defender.name === info.name) {
    //         $('#' + eagle + 'Holder').hide();
    //     } else {
    //         enemies.push(eagle);
    //         console.log(enemies);
    //     }
    // })
    $('#currentEnemy').empty();
    console.log(enemies);
}

function lose() {
    $('.main')
        .empty()
        .append(
        '<div class="row"' +
        '<div class="col-xs-12" id="lose">' +
        '<h1>You have been kicked out of the band!</h1>' +
        '</div>' +
        '<button class="btn col-xs-offset-1 col-xs-10 col-sm-offset-3 col-sm-6" id="retry">RETRY</button>' +
        '</div>'
        )
    $('#retry').click(function () {
        location.reload();
    });
}

function fight() {

    var attacker = fighters.attacker;
    var defender = fighters.defender;

    console.log(attacker.health);

    attacker.health -= defender.counter;
    attacker.attack += 10;

    if (attacker.health <= 0) {
        lose();
    } else {
        if (defender.health <= 0) {
            chooseNewEnemy(defender.name);
        } else {
            console.log(attacker.health);
            $('#attackerHealth').html('<h2>Health: ' + attacker.health + '</h2>');
            $('#attackerAttack').html('<h2>Attack Power: ' + attacker.attack + '</h2>');

            defender.health -= attacker.attack;
            console.log(defender.health);
            $('#defenderHealth').html('<h2>Health: ' + defender.health + '</h2>');
            $('#defenderCounter').html('<h2>Counter Attack: ' + defender.counter + '</h2>');
        }
    }
}

$(document).ready(function () {
    chooseEagle();
});
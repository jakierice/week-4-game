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
    third: "ATTACK!"
}

function chooseEagle() {

    $('#instructions').append('<h1>' + instructions.first + '</h1>');

    $.each(eagles, function (eagle, info) {
        var character = {
            holder: $('<div class="col-xs-6 col-sm-offset-0 col-sm-3" id="' + eagle + 'Holder"></div>'),
            name: $('<h1></h1>'),
            health: $('<h5>HP: ' + info.health + '</h5>'),
            pic: $('<img>')
        }

        character.name.append(
            info.name,
            character.health
        )
            .attr('id', eagle + 'Name');

        character.pic
            .attr('src', info.pic)
            .attr('id', eagle + 'Pic')
            .click(function () {
                setupFight(eagle);
            });

        character.holder.append(
            character.name,
            character.pic
        )
            // .addClass('col-xs-6 col-sm-offset-0 col-sm-3')
            // .attr('id', eagle + 'Holder');

        console.log(info.name);
        $('#characters').append(character.holder);
    })
}

function setupFight(attacker) {

    $('#instructions')
        .empty()
        .append('<h1>' + instructions.second + '</h1>');

    console.log(attacker);
    // create title and holding area for enemy choices
    var enemiesTitle = $('<div class="row" id="enemiesTitle"><h3>Enemies</h3></div>');
    var enemiesHolder = $('<div></div>');
    enemiesHolder.addClass('col-xs-12 col-sm-6')
        .append(enemiesTitle);
    
    // create VS tag to seperate selected character and enemies
    var vs = $('<div><h2>VS</h2></div>');
    vs.addClass('col-xs-12 col-sm-3')
        .attr('id', 'vs');

    // add VS seperator and enemies area to characters box
    $('#characters').append(
        vs,
        enemiesHolder
    );

    $.each(eagles, function (eagle, info) {
        // remove setupFight() click function from eagle pic
        $('#' + eagle + 'Pic').off();

        // reformat selected character's holder and add attack power
        if (attacker === eagle) {
            $('#' + eagle + 'Holder')
                .addClass('col-xs-offset-3');

            $('#' + eagle + 'Name').append('<h5>Attack: ' + info.attack + '</h5>');
        // add non-selected characters to new enemiesHolder area of page
        } else {
            $('#' + eagle + 'Holder')
                .appendTo(enemiesHolder)
                // remove old layout
                .removeClass('col-xs-offset-3 col-xs-6 col-sm-3')
                // add new layout
                .addClass('col-xs-4');

            // add new chooseEnemy() function to all enemies' pictures
            $('#' + eagle + 'Pic').click(function() {
                beginFight(eagle);
            });
        }
    });
}

$(document).ready(function () {
    chooseEagle();

});
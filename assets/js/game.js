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

function setupFight(attacker) {
    console.log(attacker);
    // $('#donHenley').hide();
    $.each(eagles, function (eagle, info) {
        if (eagle !== attacker) {
            $('#' + eagle + 'Holder').appendTo('#remainingEnemies');
        } else {
            var chosenCharacter = {
                holder: $('<div></div>'),
                name: $('<h1></h1>'),
                health: $('<h4></h4>'),
                attack: $('<h2></h2>'),
                pic: $('<img>')
            }

            // $('#' + eagle).removeClass('col-xs-6 col-sm-3');
            // $('#' + eagle).addClass('col-xs-12');

            // $('#' + eagle).children().empty();

            // chosenCharacter.name.append(
            //     attacker.name,
            //     chosenCharacter.health,
            //     chosenCharacter.attack
            // )
            //     .removeClass('col-xs-6 col-sm-12')
            //     .addClass('col-xs-6');

            // chosenCharacter.health.append(attacker.health);
            // chosenCharacter.pic
            //     .attr('src', attacker.pic)
            //     .addClass('col-xs-6')

            // chosenCharacter.holder.append(
            //     chosenCharacter.name,
            //     chosenCharacter.pic
            // )
            //     .addClass('col-xs-6 eagle');

            $('#' + eagle + 'Holder').removeClass('col-xs-6 col-sm-3');
            $('#' + eagle + 'Holder').addClass('col-xs-12');

            $('#' + eagle + 'Name').toggleClass('col-xs-6');
            $('#' + eagle + 'Pic').toggleClass('col-xs-6');

            $('#characters').append(chosenCharacter.holder)
                .toggleClass('col-xs-6');
        }
    });


}

function chooseEagle() {

    $.each(eagles, function (eagle, info) {
        var character = {
            holder: $('<div></div>'),
            name: $('<h1></h1>'),
            health: $('<h4></h4>'),
            pic: $('<img>')
        }

        character.name.append(
            info.name,
            character.health
        )
            .addClass('col-xs-6 col-sm-12')
            .attr('id', eagle + 'Name');

        character.health.append(info.health);
        character.pic
            .attr('src', info.pic)
            .attr('id', eagle + 'Pic')
            .addClass('col-xs-6 col-sm-12')
            .click(function () {
                setupFight(eagle);
            });

        character.holder.append(
            character.name,
            character.pic
        )
            .addClass('col-xs-6 col-sm-3')
            .attr('id', eagle + 'Holder');

        console.log(info.name);
        $('#characters').append(character.holder);

    })
}

$(document).ready(function () {
    chooseEagle();

});
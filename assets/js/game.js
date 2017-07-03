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

function buildEagle() {

    $.each(eagles, function (eagle, info) {
        var character = {
            main: $('<div></div>'),
            name: $('<h1></h1>'),
            health: $('<h4></h4>'),
            pic: $('<img>')
        }

        character.name.append(info.name);
        character.health.append(info.health);
        character.pic.attr('src', info.pic);
        character.main
            .append(
            character.name,
            character.pic,
            character.health
            )
            .addClass('col-xs-12 col-sm-3 eagle');

        // character.addClass('col-xs-12 col-sm-3 eagle')
        // character.append('<h1>' + info.name + '</h1>');
        // character.append('<img src="' + info.pic + '" id="characterPic">');
        console.log(info.name);
        $('#characters').append(character.main);
    })
}

$(document).ready(function () {
    buildEagle();

});
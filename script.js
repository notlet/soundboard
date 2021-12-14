window.addEventListener('load', () => {
    if (localStorage.getItem('keybinds') !== null) {
        keybinds = JSON.parse(localStorage.getItem('keybinds'));
    }
    var mainBlockData = '';
    for (i = 0; i < data.length; i++) {
        mainBlockData = mainBlockData + `<div class="boardElement" id="${data[i].id}"><a id="displayname">${data[i].displayname}</a> <a id="keybind"></a></div>`;
    }
    $('.mainBoard').html(mainBlockData);
    $('.boardElement').click(function () {
        elementClicked(this.id)
    });
    document.addEventListener("keydown", function (e) {
        keyPressed(e.code);
    });
})

function getKeyByValue(val) {
    return Object.keys(this).find(key => this[key] === val);
}

var keybinds = {};
let sounds = {};
var currentlyBinding = false;
var currentlyBindingToID = '';

function elementClicked(id) {
    console.log(`${id} got clicked!`);
    if (currentlyBinding == false) {
        if (sounds[id] !== undefined) {
            sounds[id].pause();
        }
        sounds[id] = new Audio(`sounds/${id}.mp3`);
        sounds[id].play();
    } else {
        currentlyBindingToID = id;
        $('.bindText').text(`Press a key you want to bind to ${$(`#${currentlyBindingToID} #displayname`).text()}! (or click me to cancel!)`)
    }
}

function startBinding() {
    $('.bindText').text('Press a sound you want to bind to a key! (or click me to cancel)').attr('onclick', 'cancelBinding()');
    currentlyBinding = true;
}

function cancelBinding() {
    $('.bindText').text('Bind Sound to a Key').attr('onclick', 'startBinding()')
    currentlyBinding = false;
    currentlyBindingToID = '';
}

function keyPressed(key) {
    if (currentlyBinding == true) {
        if (currentlyBindingToID !== '') {
            keybinds[key] = currentlyBindingToID;
            $(`#${currentlyBindingToID} #keybind`).text(`(${key})`);
            $('.bindText').text('Bind Sound to a Key').attr('onclick', 'startBinding()')
            currentlyBinding = false;
            currentlyBindingToID = '';
            localStorage.setItem('keybinds', JSON.stringify(keybinds));
        }
    } else {
        if (keybinds[key] !== undefined) {
            document.getElementById(keybinds[key]).click();
        }
    }
}
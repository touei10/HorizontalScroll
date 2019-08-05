'use strict';
var y = 250, v = 0, keyDown = false, WALLS = 80, score = 0;
var walls = [], slope = 0, timer, ship, main;

function init() {
    main = document.getElementById('main');
    ship = document.getElementById('ship');

    for (var i = 0; i < WALLS; i++) {
        walls[i] = document.createElement('div');
        walls[i].style.position = 'absolute';
        walls[i].style.top = '100px';
        walls[i].style.left = i * 10 + 'px';
        walls[i].style.width = '10px';
        walls[i].style.height = '400px';
        walls[i].style.backgroundColor = '#333333';
        main.appendChild(walls[i]);
    }

    slope = Math.floor(Math.random() * 5) + 1;
    timer = setInterval(mainLoop, 50);
    window.addEventListener('keydown', function () { keyDown = true; });
    window.addEventListener('keyup', function () { keyDown = false; });
}

function hitTest() {
    var st = parseInt(ship.style.top) + 10;
    var sh = parseInt(ship.style.height);
    var sb = st + sh - 20;
    var wt = parseInt(walls[14].style.top);
    var wh = parseInt(walls[14].style.height);
    var wb = wt + wh;
    return (st < wt) || (sb > wb);
}

function mainLoop() {
    if (hitTest()) {
        clearInterval(timer);
        document.getElementById('bang').style.top = (y - 40) + 'px';
        document.getElementById('bang').style.visibility = 'visible';
        return;
    }

    score += 5;
    document.getElementById('score').innerHTML = score.toString();

    v += keyDown ? -3 : 3;
    y += v;
    ship.style.top = y + 'px';

    var edge = walls[WALLS - 1].style;
    var t = parseInt(edge.top);
    var h = parseInt(edge.height);
    var b = t + h;
    t += slope;
    if ((t < 0) && (slope < 0) || (b > 600) && (slope > 0)) {
        slope = (Math.floor(Math.random() * 5) + 1) * (slope < 0 ? 1 : -1);
        edge.top = (t + 10) + 'px';
        edge.height = (h - 20) + 'px';
    } else {
        edge.top = t + 'px';
    }

    for (var i = 0; i < WALLS - 1; i++) {
        walls[i].style.top = walls[i + 1].style.top;
        walls[i].style.height = walls[i + 1].style.height;
    }
}
var size = 3,
    EMPTY = "&nbsp;",
    boxes = [],
    turn = "X",
    score,
    moves;

function start() {
    var board = document.createElement("table");
    board.setAttribute("border", 1);
    board.setAttribute("cellspacing", 1);

    var identifier = 1;
    for (var i = 0; i < size; i++) {
        var row = document.createElement("tr");
        board.appendChild(row);
        for (var j = 0; j < size; j++) {
            var cell = document.createElement("td");
            cell.setAttribute("height", 120);
            cell.setAttribute("width", 120);
            cell.setAttribute("align", "center");
            cell.setAttribute("valign", "center");
            cell.classList.add("col" + j, "row" + i);
            if (i == j) {
                cell.classList.add("diagonal0");
            }
            if (j == size - i - 1) {
                cell.classList.add("diagonal1");
            }
            cell.identifier = identifier;
            cell.addEventListener("click", set);
            row.appendChild(cell);
            boxes.push(cell);
            identifier += identifier;
        }
    }

    document.getElementById("tableBoard").appendChild(board);
    startNewGame();
}

/*
 * New game
 */
function startNewGame() {
    score = {
        X: 0,
        O: 0
    };
    moves = 0;
    turn = "X";
    document.getElementById("turn1").style.display = "block";
    boxes.forEach(function(square) {
        square.innerHTML = EMPTY;
    });
}

/*
 * Check if a win or not
 */
function win(clicked) {
    // Get all cell classes
    var memberOf = clicked.className.split(/\s+/);
    for (var i = 0; i < memberOf.length; i++) {
        var testClass = "." + memberOf[i];
        var items = contains("#tableBoard " + testClass, turn);
        if (items.length == size) {
            return true;
        }
    }
    return false;
}

function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function(element) {
        return RegExp(text).test(element.textContent);
    });
}

/*
 * Sets clicked square and also updates the turn.
 */
function set() {
    var i, count = 0;
    if (this.innerHTML !== EMPTY) {
        return;
    }
    this.innerHTML = turn;
    moves += 1;
    score[turn] += this.identifier;
    if (win(this)) {
        if (turn === "X") {
            pop();
        } else {
            pop1();
        }
        startNewGame();
    } else if (moves === size * size) {
        pop2();
        startNewGame();
    } else {
        turn = turn === "X" ? "O" : "X";
    }

    if (moves % 2 === 0) {
        console.log(moves);
        document.getElementById("turn1").style.display = "block";
        document.getElementById("turn2").style.display = "none";
    } else {
        console.log(moves);
        document.getElementById("turn2").style.display = "block";
        document.getElementById("turn1").style.display = "none";
    }
}

document.getElementById("Restart").addEventListener("click", function() {
    document.getElementById("turn1").style.display = "none";
    document.getElementById("turn2").style.display = "none";
    startNewGame();
});

start();


var modal = null


function pop() {
    if (modal === null) {
        document.getElementById("box").style.display = "block";
        document.getElementById("box1").style.display = "none";
        document.getElementById("draw").style.display = "none";
        modal = true
    } else {
        document.getElementById("box").style.display = "none";
        document.getElementById("box1").style.display = "block";
        document.getElementById("draw").style.display = "none";
        modal = null
    }
}

function pop1() {
    if (modal === null) {
        document.getElementById("box1").style.display = "block";
        document.getElementById("box").style.display = "none";
        document.getElementById("draw").style.display = "none";
        modal = true
    } else {
        document.getElementById("box1").style.display = "none";
        document.getElementById("box").style.display = "block";
        document.getElementById("draw").style.display = "none";
        modal = null
    }
}

function pop2() {
    if (modal === null) {
        document.getElementById("box1").style.display = "none";
        document.getElementById("box").style.display = "none";
        document.getElementById("draw").style.display = "block";
        modal = true
    } else {
        document.getElementById("box1").style.display = "none";
        document.getElementById("box").style.display = "none";
        document.getElementById("draw").style.display = "block";
        modal = null
    }
}


function closeButton() {
    document.getElementById("box1").style.display = "none";
    document.getElementById("box").style.display = "none";
    document.getElementById("draw").style.display = "none";
    startNewGame();
}

//confetti
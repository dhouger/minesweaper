// UI variables
var buttons = [];
var rows = 8;
var rowsInputEl;
var cols = 8;
var colsInputEl;
var mines = 10;
var minesInputEl;
var minesRemainingEl;
var minesweaperDiv;

var minesweaperGrid;
var mineObjects;

function init () {
    // grab elements from the DOM
    rowsInputEl = document.getElementById('rows');
    colsInputEl = document.getElementById('cols');
    minesInputEl = document.getElementById('mines');
    minesRemainingEl = document.getElementById('minesRemaining');
    minesweaperDiv = document.getElementById('minesweaper');

    minesweaperDiv.innerHTML = "";

    // parse inputs for settings in the new game;
    rows = parseInt(rowsInputEl.value);
    cols = parseInt(colsInputEl.value);
    mines = parseInt(minesInputEl.value);

    minesweaperGrid = [];
    mineObjects = [];

    if (isNaN(rows) || rows < 1 ||
        isNaN(cols) || cols < 1 ||
        isNaN(mines) || mines < 1) {
            console.error("Settings must be numbers greater than 0 to start a game");
    }
    
    // Initialize the minesweaper board
    for(var x = 0; x < rows; x++) {
        var div = document.createElement("div");
        div.class = "row";
        minesweaperGrid[x] = [];
        
        for(var y = 0; y < cols; y++) {
            var button = document.createElement("button");
            button.class = "col-auto";
            button.style.width = "30px";
            button.style.height = "30px";
            button.innerHTML = "0";

            minesweaperGrid[x][y] = {
                x: x,
                y: y,
                button: button,
                isMine: false,
                isClicked: false,
                number: 0
            };

            div.appendChild(button);
        }
        minesweaperDiv.appendChild(div);
    }

    placeMines();
    placeNumbers();
}

function placeMines() {
    while (true) {
        mineX = Math.floor(Math.random() * rows);
        mineY = Math.floor(Math.random() * cols);

        var minesweaperObj = minesweaperGrid[mineX][mineY];

        if (minesweaperObj.isMine == false) {
            minesweaperObj.isMine = true;

            mineObjects.push(minesweaperObj);
        }

        if (mineObjects.length == mines) {
            break;
        }
    }
    console.log(mineObjects);
}

function placeNumbers() {
    for (var i = 0; i < mineObjects.length; i++) {
        var mineX = mineObjects[i].x;
        var mineY = mineObjects[i].y;

        if (mineX > 0 && mineY > 0)       { minesweaperGrid[mineX - 1][mineY - 1].number += 1; minesweaperGrid[mineX - 1][mineY - 1].button.innerHTML = minesweaperGrid[mineX - 1][mineY - 1].number; }
        if (mineX > 0)                    { minesweaperGrid[mineX - 1][mineY].number += 1; minesweaperGrid[mineX - 1][mineY].button.innerHTML = minesweaperGrid[mineX - 1][mineY].number; }
        if (mineX > 0 && mineY < cols - 1)    { minesweaperGrid[mineX - 1][mineY + 1].number += 1; minesweaperGrid[mineX - 1][mineY + 1].button.innerHTML = minesweaperGrid[mineX - 1][mineY + 1].number; }
        if (mineY > 0)                    { minesweaperGrid[mineX][mineY - 1].number += 1; minesweaperGrid[mineX][mineY - 1].button.innerHTML = minesweaperGrid[mineX][mineY - 1].number; }
        if (mineY < cols - 1)                 { minesweaperGrid[mineX][mineY + 1].number += 1; minesweaperGrid[mineX][mineY + 1].button.innerHTML = minesweaperGrid[mineX][mineY + 1].number; }
        if (mineX < rows - 1 && mineY > 0)    { minesweaperGrid[mineX + 1][mineY - 1].number += 1; minesweaperGrid[mineX + 1][mineY - 1].button.innerHTML = minesweaperGrid[mineX + 1][mineY - 1].number; }
        if (mineX < rows - 1)                 { minesweaperGrid[mineX + 1][mineY].number += 1; minesweaperGrid[mineX + 1][mineY].button.innerHTML = minesweaperGrid[mineX + 1][mineY].number; }
        if (mineX < rows - 1 && mineY < cols - 1) { minesweaperGrid[mineX + 1][mineY + 1].number += 1; minesweaperGrid[mineX + 1][mineY + 1].button.innerHTML = minesweaperGrid[mineX + 1][mineY + 1].number; }
    }

    for (var y = 0; y < mineObjects.length; y++) {
        mineObjects[y].button.innerHTML = 'X';
    }
}
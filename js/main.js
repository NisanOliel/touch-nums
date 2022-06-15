'use strict'
var boardNums = 16
var boardRawColl = Math.sqrt(boardNums)
var gNum = []
var currNum = 1
var millisecond = 0
var seconds = 0
var minutes = 0
var interval
var isTimerOn;

function init() {
    numGenerator()
    renderBoard()
    currNum = 1
    millisecond = 0
    seconds = 0
    minutes = 0
    if (isTimerOn) {
        clearInterval(interval)
    }
    isTimerOn = false;
    var elTimer = document.querySelector('.timer')
    elTimer.innerHTML = `0${minutes} : 0${seconds} : 00${millisecond}`

}


function timerWatch() {
    millisecond += 11
    if (millisecond >= 1000) {
        millisecond = 0
        seconds++
        if (seconds === 60) {
            seconds = 0
            minutes++
        }
    }

    var ms = millisecond < 100 ? "0" + millisecond : millisecond
    var sec = seconds < 10 ? "0" + seconds : seconds
    var min = minutes < 10 ? "0" + minutes : minutes
    var elTimer = document.querySelector('.timer')
    elTimer.innerHTML = `${min} : ${sec} : ${ms}`

}


function changeLevel(elValue) {
    boardNums = parseInt(elValue.value)
    boardRawColl = Math.sqrt(elValue.value)
    init()

}


function cellClicked(clickedNum) {
    var cellNum = parseInt(clickedNum.innerHTML)
    if (cellNum === currNum) {
        clickedNum.style.backgroundColor = 'yellowgreen'
        var audio = new Audio("sound/yay.mp3");
        audio.play();
        if (cellNum === 1) {
            interval = setInterval(timerWatch, 11)
            isTimerOn = true;

        }
        if (currNum === boardNums) {
            clearInterval(interval)
            isTimerOn = false;
        }
        currNum++
    }



}


function renderBoard() {
    var strHTML = ''
    for (var i = 0; i < boardRawColl; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < boardRawColl; j++) {
            strHTML += `\n<td onclick="cellClicked(this)">${getRandomNum()}</td>`
        }
        strHTML += `\n</tr>\n`
    }
    var elBoard = document.querySelector('tbody.board')
    elBoard.innerHTML = strHTML
}


function numGenerator() {
    for (var i = 1; i <= boardNums; i++)
        gNum.push(i)
}


function getRandomNum() {
    var idx = getRandomInt(0, gNum.length)
    var num = gNum[idx]
    gNum.splice(idx, 1)
    return num

}
























function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

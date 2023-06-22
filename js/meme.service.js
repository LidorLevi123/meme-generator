'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'baby'] },
    { id: 2, url: 'img/2.jpg', keywords: ['sad', 'cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] }
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Hello World',
            fontSize: 35,
            color: '#ffffff',
            pos: {
                x: 0,
                y: 0
            },
            size: {
                width: 0,
                height: 0
            }
        },
        {
            txt: 'I sometimes eat Falafel',
            fontSize: 25,
            color: '#ff0000',
            pos: {
                x: 0,
                y: 0
            },
            size: {
                width: 0,
                height: 0
            }
        },
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setCurrLine(line) {
    gMeme.selectedLineIdx = gMeme.lines.indexOf(line)
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLine(prop) {
    const currLine = getCurrLine()
    const key = Object.keys(prop)[0]
    const value = prop[key]

    currLine[key] = value
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    }
}

function addLine() {
    gMeme.lines.push(_createLine())
}

function _createLine(txt = 'New Line', fontSize = 35, color = '#ffffff', x = 0, y = 0, width = 0, height = 0) {
    return { txt, fontSize, color, pos: { x, y }, size: { width, height } }
}
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
            size: 35,
            color: 'white'
        },
        {
            txt: 'I sometimes eat Falafel',
            size: 25,
            color: 'red'
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

function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
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

function addLine() {
    gMeme.lines.push(_createLine())
}

function switchLine() {
    gMeme.selectedLineIdx++
    if(gMeme.selectedLineIdx === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    }
}

function _createLine(txt = 'New Line', size = 35, color = 'white') {
    return { txt, size, color }
}
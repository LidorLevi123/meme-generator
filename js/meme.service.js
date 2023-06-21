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

function setLineTxt(txt) {
    const currLine = getCurrLine()
    currLine.txt = txt
}

function setTxtColor(color) {
    const currLine = getCurrLine()
    currLine.color = color
}

function setFont(fontSize) {
    const currLine = getCurrLine()
    currLine.size = fontSize
}
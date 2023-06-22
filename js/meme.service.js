'use strict'

var gSavedMemes = loadMemeFromStorage() || []
var gMeme = _createMeme()
var gImgs = _createImgs(27)
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

function getSavedMemes() {
    return gSavedMemes
}

function setRandomLines() {
    const randomLines = [_createLine(getRandomText()), _createLine(getRandomText())]
    gMeme.lines = randomLines
}

function setCurrLine(line) {
    gMeme.selectedLineIdx = gMeme.lines.indexOf(line)
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setMeme(meme) {
    gMeme = meme
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

function _createImg(id) {
    return { id, url: `img/${id}.jpg`, keywords: ['funny', 'baby'] }
}

function _createImgs(amount) {
    var imgs = []
    for (let i = 1; i <= amount; i++) {
        imgs.push(_createImg(i))
    }
    return imgs
}

function _createMeme() {
    return {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'MEME ME!',
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
        ]
    }
}
'use strict'

var gNextImgId = 1
var gSavedMemes = loadMemeFromStorage() || []
var gStickers = _createStickers()
var gMeme = _createMeme()
var gImgs = _createImgs(27)
var gFilter = ''
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 6, 'dog': 10, 'lol': 14 }

function getImgs() {
    var imgs = gImgs.filter(({ keywords }) => isIncluded(keywords, gFilter.toLowerCase()))
    return imgs
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

function getStickers() {
    return gStickers
}

function getKeywordSearchCountMap() {
    return gKeywordSearchCountMap
}

function setRandomLines() {
    const randomLines = [_createLine(getRandomText()), _createLine(getRandomText())]
    gMeme.lines = randomLines
}

function setFilterImg(keyword) {
    if(gKeywordSearchCountMap[keyword]) gKeywordSearchCountMap[keyword]++
    gFilter = keyword
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

function setLineDragged(isLineDragged) {
    gMeme.isLineDragged = isLineDragged
}

function setLinePos(line, dx, dy) {
    line.pos.x += dx
    line.pos.y += dy
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    }
}

function addLine(txt = '') {
    const line = _createLine()
    if(txt) line.txt = txt

    gMeme.lines.push(line)

    return line
}

function deleteLine() {
    const lineIdx = gMeme.lines.findIndex(line => line.txt === getCurrLine().txt)
    gMeme.lines.splice(lineIdx, 1)
}

function addImg(imgURL) {
    gImgs.push(_createImg(getRandomKeywords(), imgURL))
}

function isIncluded(keywords, word) {
    for (let i = 0; i < keywords.length; i++) {
        if (keywords[i].includes(word)) return true
    }
    return false
}

function _createLine(txt = 'New Line', fontSize = 35, color = '#ffffff', x = 0, y = 0, width = 0, height = 0) {
    return { txt, fontSize, color, pos: { x, y }, size: { width, height } }
}

function _createImg(keywords, imgURL = null) {
    if(!imgURL) return { id: gNextImgId, url: `img/${gNextImgId++}.jpg`, keywords }
    return { id: gNextImgId, url: imgURL, keywords }
}

function _createImgs(amount) {
    var imgs = []
    for (let i = 1; i <= amount; i++) {
        var keywords = getRandomKeywords()
        imgs.push(_createImg(keywords))
    }
    return imgs
}

function _createMeme() {
    return {
        selectedImgId: 1,
        selectedLineIdx: 0,
        isLineDragged: false,
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

function _createStickers() {
    return [
        '😀', '😂', '😍', '👍', '👏', '😊', '🙌',
        '😎', '🔥', '✨', '🎉', '💯', '🤔', '😘',
        '🤣', '🙏', '😁', '🎈', '👀', '🌟', '🥂'
    ]
}
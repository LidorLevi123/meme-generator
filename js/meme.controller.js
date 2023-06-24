'use strict'

let gElCanvas
let gCtx
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function initMeme() {
    setCanvas()
    resizeCanvas()
    renderMeme()
    renderStickers()
    setInitialLinesPos()
    addEventListeners()
}

function setCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
}

function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    
    img.src = `img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width

        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawLines(meme)
    }
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes()

    var strHTMLs = savedMemes.map(meme =>
        `<img onclick="onImgSelect(${meme.selectedImgId}, false, true)" src="${meme.imgURL}" alt="Meme-img"></img>`
    )
    document.querySelector('.saved-memes-container').innerHTML = strHTMLs.join('')
    hideMemeEditor()
    hideGallery()
    showSavedMemes()
}

function renderStickers() {
    const stickers = getStickers()

    var strHTMLs = stickers.map(sticker =>
        `<span onclick="onAddLine('${sticker}')">${sticker}</span>`)
    document.querySelector('.sticker-container').innerHTML = strHTMLs.join('')
}

function addEventListeners() {
    window.addEventListener('resize', ()=> {
        resizeCanvas()
        renderMeme()
    })

    gElCanvas.addEventListener('click', onLineClicked)

    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)

    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    if (!isLineClicked()) return
    const mousePos = getEvPos(ev)

    setLineDragged(true)
    gStartPos = mousePos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const currLine = getCurrLine()
    const { isLineDragged } = getMeme()
    if (!isLineDragged) return

    const mousePos = getEvPos(ev)
    const dx = mousePos.x - gStartPos.x
    const dy = mousePos.y - gStartPos.y

    setLinePos(currLine, dx, dy)
    gStartPos = mousePos
    renderMeme()
}

function onUp() {
    setLineDragged(false)
    document.body.style.cursor = 'grab'
}

function onSetLine(prop) {
    setLine(prop)
    renderMeme()
}

function onSetLang(lang) {
    setLang(lang)
    // if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    renderMeme()
    doTrans()
}

function onSwitchLine() {
    renderMeme() // To clear previous frames
    switchLine()
    setTimeout(drawLineFrame, 30)
    setInputs()
}

function onAddLine(txt = '') {
    const line = addLine(txt)
    setLinePos(line, gElCanvas.width / 2, gElCanvas.height / 2.4)
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onSaveMeme() {
    saveMemeToStorage()
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onLineClicked() {
    const meme = getMeme()

    meme.lines.forEach(line => {
        if (isLineClicked(line)) {
            renderMeme()
            setCurrLine(line)
            setInputs()
            setTimeout(drawLineFrame, 30)
        } else {
            renderMeme()
        }
    })
}

function isLineClicked(line = null) {
    const meme = getMeme()
    const mouseX = getEvPos(event).x
    const mouseY = getEvPos(event).y

    if (!line) {
        for (let i = 0; i < meme.lines.length; i++) {
            var currLine = meme.lines[i]

            if (mouseX >= currLine.frameX && mouseX <= currLine.frameX + currLine.frameWidth &&
                mouseY >= currLine.frameY && mouseY <= currLine.frameY + currLine.frameHeight) {
                return true
            }
        }

    } else {
        if (mouseX >= line.pos.x && mouseX <= line.pos.x + line.size.width &&
            mouseY >= line.pos.y && mouseY <= line.pos.y + line.size.height) {
            return true
        }
    }
    return false
}

function drawLines(meme) {
    if(!meme.lines.length) return
    meme.lines.forEach(line => {
        drawText(line.txt, line.fontSize, line.color, line.pos.x, line.pos.y)
        saveLineSize(line, line.pos.x, line.pos.y)
    })
}

function drawText(text, fontSize, color, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${fontSize}px Impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function drawLineFrame() {
    const currLine = getCurrLine()
    const { pos, size } = currLine

    const frameX = pos.x - (size.width / 2) - 8
    const frameY = pos.y - (size.height / 2) - 4
    const frameWidth = size.width + 16
    const frameHeight = size.height + 8

    saveFrameCoordsAndSize(frameX, frameY, frameWidth, frameHeight)

    gCtx.beginPath()
    gCtx.lineWidth = 3
    gCtx.strokeStyle = 'white'
    gCtx.strokeRect(frameX, frameY, frameWidth, frameHeight)
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse ev
        ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function getTxtSize({ txt, fontSize }) {
    gCtx.font = `${fontSize}px Impact`

    const txtMetrics = gCtx.measureText(txt)
    const width = txtMetrics.width
    const height = txtMetrics.fontBoundingBoxAscent + txtMetrics.fontBoundingBoxDescent

    return { width, height }
}

function setInputs() {
    const { txt, color, fontSize } = getCurrLine()
    document.querySelector('[name="text"]').value = txt
    document.querySelector('[name="color"]').value = color
    document.querySelector('[name="font-size"]').value = fontSize
}

function setInitialLinesPos() {
    const { lines } = getMeme()

    lines.forEach(line => {
        line.pos.x = gElCanvas.width / 2
        line.pos.y = 30
    })

    if(lines[0]) lines[0].pos.y = 30
    if(lines[1]) lines[1].pos.y = gElCanvas.height - 30
}

function saveLineSize(line) {
    line.size.width = getTxtSize(line).width
    line.size.height = getTxtSize(line).height
}

function saveFrameCoordsAndSize(frameX, frameY, frameWidth, frameHeight) {
    const currLine = getCurrLine()

    currLine.frameX = frameX
    currLine.frameY = frameY
    currLine.frameWidth = frameWidth
    currLine.frameHeight = frameHeight
}
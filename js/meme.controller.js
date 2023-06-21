'use strict'

let gElCanvas
let gCtx

function initMeme() {
    setCanvas()
    resizeCanvas()
}

function setCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth

    window.addEventListener('resize', resizeCanvas)
    renderMeme()
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

function onSetLine(prop) {
    setLine(prop)
    renderMeme()
}

function onSwitchLine() {
    renderMeme() // To clear previous frames
    switchLine()
    setTimeout(drawLineFrame, 20)

    const currLine = getCurrLine()
    document.querySelector('[name="text"]').value = currLine.txt
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function drawLines(meme) {
    var yDiff = 30
    meme.lines.forEach(line => {
        drawText(line.txt, line.size, line.color, gElCanvas.width / 2, yDiff)
        line.x = gElCanvas.width / 2
        line.y = yDiff
        yDiff += 40
    })
}

function drawText(text, size, color, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function drawLineFrame() {
    const { txt, size, x, y } = getCurrLine()
    gCtx.font = `${size}px Impact`

    const txtMetrics = gCtx.measureText(txt)
    const txtWidth = txtMetrics.width
    const txtHeight = txtMetrics.fontBoundingBoxAscent + txtMetrics.fontBoundingBoxDescent

    const frameX = x - (txtWidth/2) - 8
    const frameY = y - (txtHeight/2) - 4
    const frameWidth = txtWidth + 16
    const frameHeight = txtHeight + 8

    gCtx.beginPath()
    gCtx.lineWidth = 3
    gCtx.strokeStyle = 'white'
    gCtx.strokeRect(frameX, frameY, frameWidth, frameHeight)
}
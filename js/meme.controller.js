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
    const { txt, size, color } = getCurrLine()

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
    switchLine()
    drawLineFrame()

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
    var yDiff = 10
    meme.lines.forEach(({ txt, size, color }) => {
        drawText(txt, size, color, gElCanvas.width / 2, yDiff)
        yDiff += 40
    })
}

function drawText(text, size, color, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'top'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function drawLineFrame() {

}
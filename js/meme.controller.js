'use strict'

let gElCanvas
let gCtx

function initMeme() {
    setCanvas()
    resizeCanvas()
    addEventListeners()
}

function setCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth

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

function addEventListeners() {
    window.addEventListener('resize', resizeCanvas)

    gElCanvas.addEventListener('click', (ev) => {
        const meme = getMeme()
        const mouseX = ev.offsetX
        const mouseY = ev.offsetY

        meme.lines.forEach(line => {
            if (mouseX >= line.pos.x && mouseX <= line.pos.x + line.size.width &&
                mouseY >= line.pos.y && mouseY <= line.pos.y + line.size.height) {
                renderMeme()
                setCurrLine(line)
                setTimeout(drawLineFrame, 30)
                setInputs()
            }
        })
    })
}

function onSetLine(prop) {
    setLine(prop)
    renderMeme()
}

function onSwitchLine() {
    renderMeme() // To clear previous frames
    switchLine()
    setTimeout(drawLineFrame, 30)
    setInputs()
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
        drawText(line.txt, line.fontSize, line.color, gElCanvas.width / 2, yDiff)
        saveLinePosAndSize(line, gElCanvas.width / 2, yDiff)
        yDiff += 40
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
    const { width, height } = getTxtSize(currLine)

    const frameX = currLine.pos.x - 8
    const frameY = currLine.pos.y - 4
    const frameWidth = width + 16
    const frameHeight = height + 8

    gCtx.beginPath()
    gCtx.lineWidth = 3
    gCtx.strokeStyle = 'white'
    gCtx.strokeRect(frameX, frameY, frameWidth, frameHeight)
}

function getTxtSize({ txt, fontSize }) {
    gCtx.font = `${fontSize}px Impact`

    const txtMetrics = gCtx.measureText(txt)
    const width = txtMetrics.width
    const height = txtMetrics.fontBoundingBoxAscent + txtMetrics.fontBoundingBoxDescent

    return { width, height }
}

function saveLinePosAndSize(line, x, y) {
    line.pos.x = x - getTxtSize(line).width / 2
    line.pos.y = y - getTxtSize(line).height / 2
    line.size.width = getTxtSize(line).width
    line.size.height = getTxtSize(line).height
}

function setInputs() {
    const currLine = getCurrLine()
    document.querySelector('[name="text"]').value = currLine.txt
    document.querySelector('[name="color"]').value = currLine.color
    document.querySelector('[name="font-size"]').value = currLine.fontSize
}
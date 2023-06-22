'use strict'

function onInit() {
    renderGallery()
}

function renderGallery() {
    const imgs = getImgs()
    var strHTMLs = imgs.map(img => `<img data-id="${img.id}" onclick="onImgSelect(this)" src="${img.url}" alt="Meme-img"></img>`)
    document.querySelector('.gallery-container').innerHTML = strHTMLs.join('')
}

function onImgSelect(elImg, isFlexible = false) {
    let imgId = null

    if(isFlexible) {
        setRandomLines()
        imgId = getRandomInt(1, 27)
    } else {
        imgId = +elImg.dataset.id
    }
    hideGallery()
    showMemeEditor()
    setImg(imgId)
    initMeme()
}

function hideGallery() {
    document.querySelector('.gallery').style.display = 'none'
}

function showMemeEditor() {
    document.querySelector('.meme-editor').style.display = 'block'
}
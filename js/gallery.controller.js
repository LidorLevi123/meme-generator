'use strict'

function onInit() {
    renderGallery()
}

function renderGallery() {
    const imgs = getImgs()

    var strHTMLs = imgs.map(img => `<img data-id="${img.id}" onclick="onImgSelect(this)" src="${img.url}" alt="Meme-img"></img>`)
    document.querySelector('.gallery-container').innerHTML = strHTMLs.join('')
}

function onImgSelect(elImg) {
    hideGallery()
    showMemeEditor()
    setImg(+elImg.dataset.id)
    initMeme()
}

function hideGallery() {
    document.querySelector('.gallery-container').style.display = 'none'
}

function showMemeEditor() {
    document.querySelector('.meme-editor').style.display = 'block'
}
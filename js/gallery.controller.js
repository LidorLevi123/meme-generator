'use strict'

function onInit() {
    // renderGallery()
    initMeme()
}

function renderGallery() {
    const imgs = getImgs()

    var strHTMLs = imgs.map(img => `<img data-id="${img.id}" onclick="onImgSelect(this)" src="${img.url}" alt="Meme-img"></img>`)
    document.querySelector('.gallery-container').innerHTML = strHTMLs.join('')
}

function onImgSelect(elImg) {
    setImg(+elImg.dataset.id)
    renderMeme()
}
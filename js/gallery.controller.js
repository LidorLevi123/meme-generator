'use strict'

function onInit() {
    renderGallery()
}

function renderGallery() {
    const imgs = getImgs()
    var strHTMLs = imgs.map(img => `<img onclick="onImgSelect(${img.id})" src="${img.url}" alt="Meme-img"></img>`)
    document.querySelector('.gallery-container').innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId, isFlexible = false, isSavedMeme) {
    if (isFlexible) {
        setRandomLines()
        imgId = getRandomInt(1, 27)
    } else if(isSavedMeme) {
        const meme = gSavedMemes.find(meme => meme.selectedImgId === imgId)
        setMeme(meme)
    }
    hideGallery()
    showMemeEditor()
    setImg(+imgId)
    initMeme()
}

function showGallery() {
    document.querySelector('.gallery').style.display = 'block'
}

function showMemeEditor() {
    document.querySelector('.meme-editor').style.display = 'block'
}

function hideGallery() {
    document.querySelector('.gallery').style.display = 'none'
}

function hideMemeEditor() {
    document.querySelector('.meme-editor').style.display = 'none'
}
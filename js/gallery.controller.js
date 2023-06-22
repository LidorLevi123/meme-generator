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
    hideSavedMemes()
    hideGallery()
    showMemeEditor()
    setImg(+imgId)
    initMeme()
}

function onSetFilterImg(keyword) {
    setFilterImg(keyword)
    renderGallery()
}

function showSavedMemes() {
    document.querySelector('.saved-memes-container').style.display = 'grid'
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

function hideSavedMemes() {
    document.querySelector('.saved-memes-container').style.display = 'none'
}
'use strict'

const STORAGE_KEY = 'savedMemesDB'

function saveMemeToStorage() {
    gMeme.imgURL = gElCanvas.toDataURL('image/jpeg')
    gSavedMemes.push(gMeme)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gSavedMemes))
}

function loadMemeFromStorage() {
    var val = localStorage.getItem(STORAGE_KEY)
    return JSON.parse(val)
}
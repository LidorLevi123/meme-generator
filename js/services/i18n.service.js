'use strict'

var gCurrLang = 'en'

const gTrans = {
  gallery: {
    en: 'Gallery',
    he: 'גלרייה',
  },
  'saved-memes': {
    en: 'Saved memes',
    he: 'מימים שמורים',
  },
  about: {
    en: 'About',
    he: 'עלינו',
  },
  'lang-select': {
    en: 'Select Language',
    he: 'בחר שפה',
  },
  'btn-flexible': {
    en: 'I\'m flexible!',
    he: 'אני גמיש!',
  },
  'edit-line-placeholder': {
    en: 'Edit Line Text',
    he: 'ערוך טקסט של שורה',
  },
  'download-img': {
    en: 'Download as jpeg',
    he: 'הורד כתמונה',
  },
  'font-size': {
    en: 'Choose Font Size:',
    he: 'בחר גודל פונט:',
  },
  'facebook-share': {
    en: 'Share on Facebook',
    he: 'שתף בפייסבוק',
  },
}

function getTrans(transKey) {
  // get from gTrans
  var transMap = gTrans[transKey]
  // if key is unknown return 'UNKNOWN'
  if (!transMap) return 'UNKNOWN'
  var transTxt = transMap[gCurrLang]
  // If translation not found - use english
  if (!transTxt) transTxt = transMap.en
  return transTxt
}

function doTrans() {
  // get the data-trans and use getTrans to replace the innerText
  const els = document.querySelectorAll('[data-trans]')
  els.forEach(el => {
    const transKey = el.dataset.trans
    const transTxt = getTrans(transKey)
    // support placeholder
    if (el.placeholder) el.placeholder = transTxt
    else el.innerText = transTxt
  })
}

function setLang(lang) {
  gCurrLang = lang
}

function formatDate(time) {
  var options = {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }

  return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}
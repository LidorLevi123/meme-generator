'use strict'

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1))
}

function getRandomText() {
    var memeSentences = [
        "I can't even",
        "That's what she said",
        "Am I a joke to you?",
        "Why you do this?",
        "Nope, Chuck Testa",
        "Doge much wow",
        "You had one job",
        "Do you even lift?",
        "I can haz cheezburger?",
        "It's over 9000!",
        "Keep calm and carry on",
        "I see what you did there",
        "All your base are belong to us",
        "Ain't nobody got time for that",
        "Feels bad man",
        "Y U NO",
        "Deal with it",
        "I'm in ur base, killing ur doodz",
        "I made dis",
        "This is fine",
        "You don't say?",
        "One does not simply",
        "Inconceivable!",
        "Say hello to my little friend!",
        "Here's Johnny!",
        "I'm Batman",
        "To infinity and beyond!",
        "It's a trap!",
        "That's a bold strategy, Cotton",
        "I'll be back",
        "Luke, I am your father",
        "I have the high ground",
        "Wubba lubba dub dub!",
        "Winter is coming",
        "I solemnly swear that I am up to no good",
        "I volunteer as tribute",
        "What is love? Baby don't hurt me",
        "I'm Rick James, [expletive]",
        "Houston, we have a problem",
        "This is Sparta!",
        "I'm the king of the world!",
        "Shut up and take my money!",
        "Hakuna Matata!",
        "You can't handle the truth!",
        "That's hot",
        "I feel the need... the need for speed"
      ]

    return memeSentences[getRandomInt(0, memeSentences.length-1)]
}
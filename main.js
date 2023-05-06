// array of words
const words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
];

// set the levels
const levels = {
    'Easy': 5,
    'Medium': 3,
    'Hard': 2,
};

// default level
let defaultLevelName = 'Medium';
let defaultLevelSeconds = levels[defaultLevelName];

// get selectors
let startButton = document.querySelector('.start');
let lelevelNameSpan = document.querySelector('.message .level');
let secondsSpan = document.querySelector('.message .seconds');
let theWord = document.querySelector('.the-word');
let upcomingWords = document.querySelector('.upcoming-words');
let input = document.querySelector('.input');
let timeLeftSpan = document.querySelector('.time span');
let scoreGot = document.querySelector('.score .got');
let scoreTotal = document.querySelector('.score .total');
let finishMessage = document.querySelector('.finish');

// set level name, seconds and score
lelevelNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length

// disable paste event
input.onpaste = () => false;

// start the game
startButton.onclick = () => {
    startButton.remove();
    input.focus();

    // generate word function
    generateWord();
};

function generateWord() {
    // get a random word from words
    let randomWord = words[Math.floor(Math.random() * words.length)];

    // get word's index
    let wordIndex = words.indexOf(randomWord);

    // remove word from array
    words.splice(wordIndex, 1);

    //show the random word
    theWord.innerHTML = randomWord;

    // empty upcoming words
    upcomingWords.innerHTML = '';

    // generate upcoming words
    for (let i = 0; i < words.length; i++) {
        let div = document.createElement('div');
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }

    // call start play function
    startPlay();
}

function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML == 0) {
            // stop timer
            clearInterval(start);

            // compare words
            if (theWord.innerHTML.toLowerCase() == input.value.toLowerCase()) {
                // empty input field
                input.value = '';
                // increase score
                scoreGot.innerHTML++;

                // check if there are still words left
                if (words.length > 0) {
                    // call generate words function
                    generateWord();
                } else {
                    // end game
                    let span = document.createElement('span');
                    span.className = 'prefect';
                    let spanTxt = document.createTextNode('Congratulations!!!');
                    span.appendChild(spanTxt);
                    finishMessage.appendChild(span);
                    // remove upcoming words box
                    upcomingWords.remove();
                }
            } else {
                let span = document.createElement('span');
                span.className = 'poor';
                let spanTxt = document.createTextNode('Game Over');
                span.appendChild(spanTxt);
                finishMessage.appendChild(span);
            }
        }
    }, 1000);
}
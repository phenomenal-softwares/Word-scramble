/**
 * Words to Scramble and their hints
 */
let wordsJSON = [
    {
        'word':`tinubu`,
        'hint': `current president of Nigeria`
    },
    {
        'word':`phenomenal`,
        'hint': `the company that developed this game`
    },
    {
        'word':`scammer`,
        'hint': `a fraudster`
    },
    {
        'word':`sapa`,
        'hint': `Nigerian Pidgin term for a state of being financially broke`
    },
    {
        'word':`agbada`,
        'hint': `a popular elegant Nigerian attire`
    },
    {
        'word':`malaria`,
        'hint': `a common disease in Africa`
    },
    {
        'word':`dangote`,
        'hint': `owner of Africa's largest refinery`
    },
    {
        'word':`iphone`,
        'hint': `Apple's most popular product`
    },
    {
        'word':`lecturer`,
        'hint': `a teacher at tertiary institution`
    },
    {
        'word':`money`,
        'hint': `what you need most right now`
    }
]
/**
 * Game Class/Object
 */
class ScrambleGame{
    words;
    scrambleWord;
    hintContainer;
    timerContainer;
    timeDuration = 21;
    currentWord;
    timerInterval;
    currentWordIndex;
    /** 
     * Class Constructor
    */
    constructor(wordsJSON){
        // Scrambled Word Element Selector
        this.scrambleWord = document.getElementById('scrambled-word')
        // Hint Container Element Selector
        this.hintContainer = document.getElementById('hint-container')
        // Timer Container Element Selector
        this.timerContainer = document.getElementById('game-timer')
        // Store Words
        this.words = wordsJSON
    }
    /**
     * setTimer
     */
    setTimer(time=0){
        time--;
        this.timerContainer.dataset.timeLeft = time
        this.timerContainer.innerHTML = `<b>Time Left:</b> ${time}s`;
    }
    /**
     * Initilize the Game
     */
    initGame(){
        // Clear Timer Interval if Already exists
        if(this.timerInterval !== undefined)
            clearInterval(this.timerInterval)
        // console.log(`Current Words Length: ${this.words.length}`)

        // Check all if there still words left to guess
        if(this.words.length <= 0){
            alert(`Congratulations!!! You have guessed all the words.`)
            location.reload()
        }
        // Reset Guess Word input Field
        document.getElementById('guess-word').value = ''
        // Focus Guess Word input Field
        document.getElementById('guess-word').focus()
        // Random select word index/key
        var indx = Math.floor(Math.random() * (this.words.length - 1))
        // console.log(`Current Index: ${indx}`)
        // selected word data
        var wordData = this.words[indx]
        // store current word index
        this.currentWordIndex = indx
        // current word
        var word = wordData.word
        // store current word
        this.currentWord = word
        // Update word hint
        this.hintContainer.innerHTML = `<b>Hint:</b> ${wordData.hint}`
        //split word's characters
        var wordSplit = word.split("")
        // Shuffle/Scramble the words Characters
        for(var i = wordSplit.length - 1; i > 0; i--){
            let j = Math.floor(Math.floor(Math.random() * ( i + 1 )));
            [wordSplit[i], wordSplit[j]] = [wordSplit[j], wordSplit[i]]
        }
        // group the scrabled characters
        var scrambled = wordSplit.join("").toUpperCase()
        // Display Scarmbled word
        this.scrambleWord.innerText = scrambled
        // Reset Timer
        this.setTimer(this.timeDuration)
        // Start Timer
        this.timerInterval = setInterval(()=>{
            this.setTimer(this.timerContainer.dataset.timeLeft || this.timeDuration)
            if(this.timerContainer.dataset.timeLeft < 0){
                clearInterval(this.timerInterval)
                alert(`Time is up!`)
                location.reload()
            }
        }, 1000)
    }
    /**
     * Check Guessed Word
     */
    checkWord(){
        if(this.timerInterval !== undefined)
        var guessWord = document.getElementById('guess-word').value
        var rightWord = this.currentWord;
        if(guessWord.toLowerCase() === rightWord.toLowerCase()){
            alert(`You have guessed the right word!
            "${rightWord.toUpperCase()}"
            `)
            delete this.words[this.currentWordIndex]
            this.words = this.words.filter(el => el)
            this.initGame()
        }else{
            alert(`You got it wrong!
            It was ${rightWord.toUpperCase()}`)
            location.reload()
        }
    }
}

/**
 * Game Elements Event Listener
 */
var game = new ScrambleGame(wordsJSON)
document.getElementById('start-game').addEventListener('click', e =>{
    document.getElementById('game-start-container').style.display = `none`
    document.getElementById('game-container').style.setProperty('--default-height',document.getElementById('game-container').scrollHeight + 'px')
    document.getElementById('game-container').classList.add('show')
    game.initGame()
})
document.getElementById('check-word').addEventListener('click', e =>{
    e.preventDefault()
    game.checkWord()
})
document.getElementById('guess-word').addEventListener('keyup', e =>{
    if(e.key == 'Enter' || e.which == 13 || e.keyCode == 13){
        e.preventDefault()
        game.checkWord()
    }
})
document.getElementById('reset-word').addEventListener('click', e =>{
    e.preventDefault()
    game.initGame()
})

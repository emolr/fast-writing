import Controller from './Controller';
import GameModel from '../model/GameModel';
import CountDown from '../utils/Countdown';
import WordSlider from '../utils/Wordslider';

// Flow
// 1: user select level and seconds
// 2. game play
// 3. show result


export default class AppController extends Controller {

  constructor () {

    super();

    this.words = [];
    this.userWords = [];
    this.settings = {
      level: null,
      seconds: null
    };

    this.showSettings();
  }


  showSettings() {

    this.levelSelector = document.querySelectorAll('.js-select-level');
    this.timeSelector = document.querySelectorAll('.js-select-time');
    this.startBtn = document.querySelectorAll('.js-start-game');
    this.startBtn[0].addEventListener('click', this.startNewGame.bind(this));
  }


  startNewGame() {
    this.settings = {
      level: parseInt(this.levelSelector[0].options[this.levelSelector[0].selectedIndex].value),
      seconds: parseInt(this.timeSelector[0].options[this.timeSelector[0].selectedIndex].value)
    }

    this.newGame = new GameModel({
      level: this.settings.level,
      seconds: this.settings.seconds
    });

    this.setupGame();
  }


  setupGame() {

    this.getWordsAndPopulate(this.newGame.level)
      .then(() => {
        this.buildCountdown(this.newGame.seconds);
        this.wordSlider = document.querySelectorAll('.word-slider');
        this.slider = new WordSlider(this.wordSlider);
      });

    // Register the input and start the word handling
    this.wordInput = document.querySelectorAll('.js-word-input');
    this.wordInput[0].addEventListener('keydown', this.submitWord.bind(this));

  }


  getWordsAndPopulate(level) {
    this.wordsContainer = document.querySelectorAll('.js-words');
    let wordList = '';

    return new Promise((resolve, reject) => {
      GameModel.getWords(level)
        .then(words => {
          this.words = words;

          // Append the list of words
          this.words.map((word, i) => {
            let activeClass;
            if (i === 0) {
              activeClass = `is-active`;
            }

            wordList = wordList + `<div id="word-`+ i +`" class="${activeClass}"><div class="word-slider__word">`+ word +`</div></div>`;
          });

          this.wordsContainer[0].innerHTML = wordList;

          resolve();
        });
    });

  }


  buildCountdown(seconds) {

    this.countdown = document.querySelectorAll('.js-countdown');

    let endtime = new Date();
    endtime.setSeconds(endtime.getSeconds() + parseInt(seconds));

    CountDown.counter(this.countdown[0], endtime)
      .then(() => {
        this.showResults();
      });

  }


  submitWord(e) {

    if (e.keyCode == 13 || e.keyCode == 32) {
      let value = this.wordInput[0].value;
      this.userWords.push(value.trim());
      this.wordInput[0].value = '';

      /*
       * check if words are matching
      */
      const wordIndex = this.userWords.length-1;
      const wordElem = document.getElementById('word-'+ wordIndex);

      if (this.userWords.length < this.words.length) {

        if (this.userWords[wordIndex].toUpperCase() === this.words[wordIndex].toUpperCase()) {
          wordElem.classList.add('is-correct');
        } else {
          wordElem.classList.add('is-incorrect');
        }

        this.nextWord();
      } else {
        if (this.userWords[wordIndex].toUpperCase() === this.words[wordIndex].toUpperCase()) {
          wordElem.classList.add('is-correct');
        } else {
          wordElem.classList.add('is-incorrect');
        }
        this.showResults();
      }
    }

  }



  showResults() {
    const errorContainer = document.querySelectorAll('.js-error-word-list');
    let errorList = '';

    this.userWords.map((word, i) => {
      if (word.toUpperCase() != this.words[i].toUpperCase()) {
        errorList = errorList +`
          <div>
            <span class="is-incorrect">`+ word +`</span>
            <span>--></span>
            <span>`+ this.words[i] +`</span>
          </div>`;
      }
    });

    errorContainer[0].innerHTML = errorList;

  }

  nextWord() {
    this.slider.slideNext();
  }


}

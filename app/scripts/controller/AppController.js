import Controller from './Controller';
import GameModel from '../model/GameModel';
import CountDown from '../utils/Countdown';
import WordSlider from '../utils/Wordslider';
import * as Utils from '../utils/Utils';

// Flow
// 1: user select level and seconds
// 2. game play
// 3. show result


export default class AppController extends Controller {

  constructor () {

    super();

    this.words = [];
    this.userWords = [];
    this.points = 0;
    this.settings = {
      level: null,
      seconds: null
    };
    this.secondsElapsed = 0;
    this.startTime = null;

    this.settingsPane = document.querySelectorAll('.app__settings');
    this.gamePane = document.querySelectorAll('.app__game');
    this.resultPane = document.querySelectorAll('.app__results');

    this.currentPane = this.settingsPane;

    this.levelSelector = document.querySelectorAll('.js-select-level');
    this.timeSelector = document.querySelectorAll('.js-select-time');
    this.wordsContainer = document.querySelectorAll('.js-words');
    this.startBtn = document.querySelectorAll('.js-start-game');
    this.settingsBtn = document.querySelectorAll('.js-show-settings');
    this.wordInput = document.querySelectorAll('.js-word-input');

    this.settingsBtn[0].addEventListener('click', this.showSettings.bind(this));
    this.wordInput[0].addEventListener('keydown', this.submitWord.bind(this), false);
    this.wordInput[0].addEventListener('keyup', this.clearEmptyInput.bind(this), false);

    for (let i = 0; i < this.startBtn.length; i++) {
      this.startBtn[i].addEventListener('click', this.startNewGame.bind(this));
    }

  }



  clearGame() {
    this.words = [];
    this.userWords = [];
    this.points = 0;
    this.settings = {
      level: null,
      seconds: null
    };
    this.secondsElapsed = 0;
    this.startTime = null;
  }


  showSettings() {
    this.togglePane(this.resultPane[0], this.settingsPane[0]).then(() => {
      this.currentPane = this.settingsPane;
    });
  }


  startNewGame() {
    this.clearGame();
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

    let prevPane;
    if (this.currentPane == this.settingsPane) {
      prevPane = this.settingsPane[0];
    } else {
      prevPane = this.resultPane[0];
    }

    this.getWordsAndPopulate(this.newGame.level)
      .then(() => {
        Utils.animateOut(prevPane).then(() => {
          this.gamePane[0].style.display = 'block';
          this.gamePane[0].style.opacity = '0';

          this.wordSlider = document.querySelectorAll('.word-slider');
          this.slider = new WordSlider(this.wordSlider);
          this.buildCountdown(this.newGame.seconds);
          this.countdown.pause();
          this.wordInput[0].value = '';

          Utils.animateIn(this.gamePane[0]).then(() => {
            this.gamePane[0].style.opacity = '1';
            this.wordInput[0].focus();
            this.countdown.startCounter(this.countDownElem[0]).then(() => {
              this.showResults();
            });
            this.currentPane = this.gamePane;

            // Start time tracker
            this.startTime = new Date();
          });
        });
      });

  }


  getWordsAndPopulate(level) {
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
    this.countDownElem = document.querySelectorAll('.js-countdown');

    let endtime = new Date();
    endtime.setSeconds(endtime.getSeconds() + parseInt(seconds));

    if (this.countdown) {
      this.countdown.destroy(this.countDownElem[0]);
    }

    this.countdown = new CountDown(this.countDownElem[0], endtime);
    this.countdown.startCounter(endtime).then(() => {
      this.showResults();
    });

  }

  clearEmptyInput(e) {
    if (e.keyCode == 32) {
      let value = this.wordInput[0].value;

      if (value === ' ') {
        this.wordInput[0].value = '';
      }

    }
  }


  submitWord(e) {
    if (e.keyCode == 13 || e.keyCode == 32) {
      let value = this.wordInput[0].value;

      if (value == '' || value == ' ') {
          // do nothing
      } else if (value.length > 0) {

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

  }


  getPoints() {
    return new Promise((resolve, reject) => {
      this.userWords.forEach((word, i) => {
        if (word.toUpperCase() === this.words[i].toUpperCase()) {
          this.points++;
        }
      });
      resolve(this.points);
    });
  }


  showResults() {
    Utils.animateOut(this.gamePane[0]).then(() => {
      Utils.animateIn(this.resultPane[0]).then(() => {
      });
    });

    // Stop elapsed time
    const timeNow = new Date();
    this.timeElapsed = timeNow.getSeconds() - this.startTime.getSeconds();

    this.countdown.destroy(this.countDownElem[0]);
    const errorContainer = document.querySelectorAll('.js-error-word-list');
    const errorText = document.querySelectorAll('.js-error-word-text');
    const userPointsContainer = document.querySelectorAll('.js-user-points');
    const userEntriesContainer = document.querySelectorAll('.js-user-entries');
    let errorList = '';

    this.userWords.map((word, i) => {
      if (word.toUpperCase() != this.words[i].toUpperCase()) {
        errorList = errorList +`
          <div>
            <span class="is-incorrect">`+ word +`</span>
            <span><img src="images/arrow.svg" alt="arrow"/></span>
            <span>`+ this.words[i] +`</span>
          </div>`;
      }
    });

    if (errorList != '') {
      errorText[0].classList.remove('hide');
    } else {
      errorText[0].classList.add('hide');
    }

    errorContainer[0].innerHTML = errorList;

    this.getPoints().then((result) => {
      userPointsContainer[0].innerHTML = result;
      userEntriesContainer[0].innerHTML = this.userWords.length
    });

    this.buildStars();

  }


  togglePane(prevPane, nextPane) {
    return new Promise((resolve, reject) => {
      Utils.animateOut(prevPane).then(() => {
        Utils.animateIn(nextPane).then(() => {
          resolve();
        });
      });
    });

    // this.settingsPane[0].classList.add('hide');
    // this.gamePane[0].classList.add('hide');
    // this.resultPane[0].classList.add('hide');

    // elem[0].classList.remove('hide');

  }


  nextWord() {
    this.slider.slideNext();
  }


  buildStars() {
    const elem = document.querySelectorAll('.js-stars');
    const starIcon = `<svg width="39px" height="37px" viewBox="0 0 39 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch -->
        <title>Shape Copy 2</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Resultat" transform="translate(-752.000000, -361.000000)" fill="#F5F5F5">
                <g id="ic_star_border_black_24px" transform="translate(653.000000, 361.000000)">
                    <g id="Group">
                        <polygon id="Shape-Copy-2" points="138 14.0325843 124.064326 12.8308989 118.617978 0 113.171629 12.8502809 99.2359551 14.0325843 109.818539 23.2002809 106.639888 36.8258427 118.617978 29.5963483 130.596067 36.8258427 127.436798 23.2002809"></polygon>
                    </g>
                </g>
            </g>
        </g>
    </svg>`;
    const stars = starIcon + starIcon + starIcon;
    elem[0].innerHTML = stars;
    elem[0].classList.remove('stars--1');
    elem[0].classList.remove('stars--2');
    elem[0].classList.remove('stars--3');

    if (this.points > this.timeElapsed && this.points === this.userWords.length) {
      elem[0].classList.add('stars--3');
    } else if (this.points < (this.userWords.length / 2)) {
      elem[0].classList.add('stars--1');
    } else if (this.points <= this.userWords.length) {
      elem[0].classList.add('stars--2');
    }

  }


}

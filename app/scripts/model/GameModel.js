import Model from './Model';
import * as Utils from '../utils/Utils';

export default class GameModel extends Model {
  constructor(data, key) {
    super(key);
    let model = {
      level: 1,
      seconds: 180,
      score: null,
      date: new Date
    }

    model = Utils.extend(model, data);

    this.level = model.level;
    this.seconds = model.seconds;
    this.score = model.score;
    this.date = model.date;
  }

  static getWords(level = 1) {
    let words = [];
    let wordList = [];
    return new Promise((resolve, reject) => {

      switch (level) {
        case 1:
            wordList = ['halvtreds', 'stadse', 'ridse', 'meget', 'lystig', 'hurtigt', 'adresse', 'fortov', 'hoved', 'linje', 'satellit', 'hvorimod', 'træg', 'stage', 'stige', 'nøjagtig', 'bue', 'bage', 'hjort', 'hvilken', 'vånde'];
            words = Utils.shuffle(wordList);
        break;
        case 2:
            wordList = ['træg', 'stage', 'stige', 'nøjagtig', 'bue', 'bage', 'hjort', 'hvilken', 'vånde'];
            words = Utils.shuffle(wordList);
        break;
        case 3:
            wordList = ['WOK', 'moum', 'tosse', 'råke', 'meaf', 'miaw', 'træcis', 'meakrome', 'tjuten', 'abelone', 'moumsons', 'most'];
            words = Utils.shuffle(wordList);
        break;
      }

      resolve(words);

    });


  }
}

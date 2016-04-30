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

    switch (level) {
      case 1:
        return new Promise((resolve, reject) => {
          let words = ['this', 'is', 'easy', 'i', 'must', 'say'];
          resolve(words);
        });
      break;
      case 2:
        return new Promise((resolve, reject) => {
          let words = ['this', 'is', 'medium'];
          resolve(words);
        });
      break;
      case 3:
        return new Promise((resolve, reject) => {
          let words = ['game', 'is', 'hard'];
          resolve(words);
        });
      break;
    }

  }
}

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
        case 4:
            wordList = ['하다', '있다', '수', '하다', '나', '없다', '않다', '사람', '우리', '그', '아니다', '보다', '거', '보다', '같다', '주다', '대하다', '가다', '년', '한', '말', '일', '이', '말하다', '위하다', '그러나', '오다', '알다', '씨', '그렇다', '크다', '일', '사회', '많다', '안', '좋다', '더', '받다', '그것', '집', '나오다', '그리고', '문제', '그런', '살다', '저', '못하다', '생각하다', '모르다', '속', '만들다', '데', '앞', '경우', '중', '어떤', '잘', '그녀', '먹다', '자신', '문화', '원', '생각', '어떻다', '명', '통하다', '그러다', '그러다', '소리', '다시', '다른', '이런', '여자', '개', '정도', '다', '좀', '싶다', '보이다', '가지다', '함께', '아이', '지나다', '많이', '시간', '너', '인간', '사실', '나다', '이렇다', '어머니', '눈', '뭐', '점', '의하다', '시대', '다음', '이러하다', '누구', '곳', '여러', '안', '하나', '세계', '버리다', '위', '운동', '퍼센트', '학교', '자기', '가장', '대통령', '가지', '시작하다', '바로', '어느', '그래서', '무엇', '정부', '모든', '번', '그거', '돈', '국가', '그런데', '날', '여기', '모두', '여성', '친구', '마음', '후', '놓다', '관계', '아버지', '남자', '어디', '몸', '얼굴', '왜', '나타나다', '지역', '다르다', '모습', '물', '만나다', '내다', '보이다', '쓰다', '이것', '없이', '이번', '길', '생활', '쓰다', '뿐', '사이', '방법', '새롭다', '내다', '앉다', '처음', '손', '몇', '그때', '과정', '삶', '갖다', '찾다', '특히', '시', '이상', '지금', '나가다', '이야기', '교육', '사다', '경제', '아직', '잡다', '같이', '선생님', '예술', '서다', '못', '역사', '읽다', '결과', '내용', '물론', '책', '일어나다', '당신', '시장', '넣다', '중요하다', '무슨', '느끼다', '어렵다', '힘', '너무', '나라', '부르다', '의미', '자리', '밝히다', '죽다', '이미', '쪽', '정치', '국민', '생명', '얘기', '학생', '연구', '엄마', '이름', '하나', '내리다', '사건', '및', '쉽다', '짓다', '이유', '필요하다', '글', '생기다', '사용하다', '남편', '밖', '세상', '작다', '타다', '대학', '작품', '상황','가운데'];
            words = Utils.shuffle(wordList);
        break;
      }

      resolve(words);

    });


  }
}
export default class Countdown {

  static getTimeRemaining(endtime) {

    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };

  }

  static counter(elem, endtime) {

    return new Promise((resolve, reject) => {
      let timeLeft = this.getTimeRemaining(endtime);

      // Set inital start time
      elem.innerHTML = `
        <span>`+ timeLeft.minutes +`</span>
        <span>:</span>
        <span>`+ timeLeft.seconds +`</span>`;

      // Start the countdown
      let counter = setInterval(() => {

        timeLeft = this.getTimeRemaining(endtime);

        if (timeLeft.total === 0) {
          clearInterval(counter);
          resolve('countdown done');
        }

        elem.innerHTML = `
          <span>`+ timeLeft.minutes +`</span>
          <span>:</span>
          <span>`+ timeLeft.seconds +`</span>`;

      }, 1000);
    });

  }
}

export default class Countdown {

  constructor(elem, endtime) {
    this.total = 0;
    this.days = 0;
    this.hours = 0,
    this.minuts = 0;
    this.seconds = 0;
    this.counterId = null;
    this.elem = elem;
    this.endTime = endtime;
  }


  getTimeRemaining() {
    const t = Date.parse(this.endTime) - Date.parse(new Date());
    const seconds = Math.floor( (t/1000) % 60 );
    const minutes = Math.floor( (t/1000/60) % 60 );
    const hours = Math.floor( (t/(1000*60*60)) % 24 );
    const days = Math.floor( t/(1000*60*60*24) );

    this.total = t,
    this.days = days,
    this.hours = hours,
    this.minutes = minutes,
    this.seconds = seconds

  }


  startCounter(endtime) {
    this.getTimeRemaining(endtime);
    this.elem.innerHTML = `
      <span>`+ this.minutes +`</span>
      <span>:</span>
      <span>`+ this.seconds +`</span>`;
    return new Promise((resolve, reject) => {

      this.counterId = setInterval(() => {
        if (this.total == '0') {

          this.destroy();
          resolve('countdown done');

        } else {
          this.getTimeRemaining(this.endTime);

          this.elem.innerHTML = `
            <span>`+ this.minutes +`</span>
            <span>:</span>
            <span>`+ this.seconds +`</span>`;

        }
      }, 1000);
    });

  }

  pause() {
    clearInterval(this.counterId);
  }

  unPause() {
    this.startCounter(this.endTime);

  }

  destroy(elem) {
    clearInterval(this.counterId);
    this.total = 0;
    this.days = 0;
    this.hours = 0,
    this.minuts = 0;
    this.seconds = 0;
  }

  // static counter(elem, endtime) {
  //   return new Promise((resolve, reject) => {
  //     let timeLeft = this.getTimeRemaining(endtime);
  //     let counterId = 0;
  //     console.log(counterId)
  //     // Set inital start time
  //     elem.innerHTML = `
  //       <span>`+ timeLeft.minutes +`</span>
  //       <span>:</span>
  //       <span>`+ timeLeft.seconds +`</span>`;

  //     // Start the countdown
  //     // clearInterval(counter);
  //     const counter = setInterval(() => {

  //       timeLeft = this.getTimeRemaining(endtime);

  //       if (timeLeft.total === 0) {
  //         clearInterval(counter);
  //         resolve('countdown done');
  //       }

  //       elem.innerHTML = `
  //         <span>`+ timeLeft.minutes +`</span>
  //         <span>:</span>
  //         <span>`+ timeLeft.seconds +`</span>`;
  //     }, 1000);
  //     counterId = counter;
  //   });

  // }
}

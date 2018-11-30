import * as Utils from './Utils';

export default class WordSlider {

  constructor(element) {
    this.slideContainer = element[0].children[0];
    this.currentPosition = 0;
    this.currentSlide = 0;
    this.containerPosition = this.slideContainer.offsetLeft;
    this.positions = [];
    this.slides = this.slideContainer.children;
    this.activeSlidePadding = null;
    this.nextSlide = 1;
    this.nextSlideItem = this.slides[this.nextSlide];
    this.nextSlideItemWidth = this.nextSlideItem.offsetWidth;
    this.nextSlideOffset = this.nextSlideItem.offsetLeft - this.containerPosition;
    const firstSlideWidth = this.slides[0].offsetWidth-15;

    // First center the first item
    this.slideContainer.setAttribute('style', Utils.translate3d(-(firstSlideWidth / 2), 0, 0, 0));

    this.slides[0].classList.add('is-active');
    const containerRect = this.slideContainer.getBoundingClientRect();

    for (let i = 0; i < this.slides.length; i++) {
      const elemPosition = this.slides[i].getBoundingClientRect().x - containerRect.x + (this.slides[i].offsetWidth / 2);
      this.positions.push(elemPosition);
    }

  }

  slideNext() {
    this.nextSlide = this.currentSlide + 1;
    this.nextSlideItem = this.slides[this.nextSlide];
    this.currentSlide = this.nextSlide;

    let transformValue = -(this.positions[this.nextSlide]);

    let activeSlide = document.querySelectorAll('.is-active');

    if (activeSlide[0]) {
      activeSlide[0].classList.remove('is-active');
    }

    this.nextSlideItem.classList.add('is-active');
    this.slideContainer.setAttribute('style', Utils.translate3d((transformValue), 0, 0, 200));
  }

}

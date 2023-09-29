export function extend(defaultOptions, inputOptions) {
  var newOptions = defaultOptions;

  for (var key in inputOptions) {
    if (inputOptions.hasOwnProperty(key)) {
      if (inputOptions[key] !== undefined) {
        newOptions[key] = inputOptions[key];
      }
    }
  }

  return newOptions;
}

export function animateIn(element) {
  return new Promise((resolve, reject) => {
    function show() {
      element.classList.remove('animate-enter');
      element.removeEventListener('animationend', show, false);
      resolve();
    }
    element.style.display = 'block';
    element.classList.add('animate-enter');
    element.addEventListener('animationend', show, false);
  });
}

export function animateOut(element) {

  return new Promise((resolve, reject) => {
    function hide() {
      element.classList.remove('animate-leave');
      element.style.display = 'none';
      element.removeEventListener('animationend', hide, false);
      resolve();
    }
    element.classList.add('animate-leave');
    element.addEventListener('animationend', hide, false);
  });
}

export function translate3d(x, y, z, t) {
  t = (typeof t === "undefined") ? 0 : t; //defaults to 0
  var tr = '-webkit-transform: translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px); -webkit-transition: ' + t + 'ms;' +
       '-moz-transform: translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px); -moz-transition: ' + t + 'ms;' +
       '-ms-transform: translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px); -ms-transition: ' + t + 'ms;' +
       '-o-transform: translate(' + x + 'px, ' + y + 'px); -o-transition: ' + t + 'ms;' +
       'transform: translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px); transition: ' + t + 'ms;';

  return tr;
}

export function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;

}

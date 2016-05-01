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

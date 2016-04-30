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

export default {
  install
};

function install(Vue, options = {}) {
  const production = options.production !== undefined
    ? options.production
    : process.env.NODE_ENV === 'production';

  Vue.directive('test', createDirective(production));
}

function createDirective(production) {
  return function directive(el, binding) {
    if (!production && binding.value !== binding.oldValue) {
      modifyElement(el, binding.value);
    }
  };
}

function modifyElement(el, value) {
  if (value === false) {
    el.removeAttribute('data-test');
  } else {
    el.setAttribute('data-test', evaluateValue(value));
  }
}

function evaluateValue(value) {
  return Array.isArray(value)
    ? value.join(' ')
    : value;
}
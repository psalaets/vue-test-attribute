const directive = {
  bind(el, binding) {
    if (process.env.NODE_ENV !== 'production') {
      modifyElement(el, binding.value);
    }
  },
  update(el, binding) {
    if (process.env.NODE_ENV !== 'production') {
      if (binding.value !== binding.oldValue) {
        modifyElement(el, binding.value);
      }
    }
  }
};

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

function install(Vue) {
  Vue.directive('test', directive);
}

export default {
  install
};
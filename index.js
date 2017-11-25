const directive = {
  bind(el, binding) {
    if (process.env.NODE_ENV !== 'production') {
      setAttribute(el, binding.value);
    }
  },
  update(el, binding) {
    if (process.env.NODE_ENV !== 'production') {
      if (binding.value !== binding.oldValue) {
        setAttribute(el, binding.value);
      }
    }
  }
};

function setAttribute(el, value) {
  el.setAttribute('data-test', evaluateValue(value));
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
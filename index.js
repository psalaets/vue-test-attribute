import { isPrimitive } from "util";

export default {
  install,
  ssr: createSsr
};

function install(Vue, settings = {}) {
  const production = isProduction(settings);
  Vue.directive('test', createDirective(production));
}

function createSsr(settings = {}) {
  const production = isProduction(settings);

  return function ssr(vnode, directiveMeta) {
    if (!production) {
      const value = directiveMeta.value;
      vnode.data.attrs['data-test'] = evaluateValue(value);
    }
  };
}

function isProduction(settings) {
  return settings.production !== undefined
    ? settings.production
    : process.env.NODE_ENV === 'production';
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

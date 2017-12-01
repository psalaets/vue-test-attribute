import Vue from 'vue';
import { mount } from 'vue-test-utils';

import plugin from '../index';

Vue.use(plugin, {
  production: false
});

describe('options.production === false', () => {
  it('adds attribute to element', () => {
    const wrapper = mount(component(), {
      propsData: {
        name: 'person'
      }
    });

    expect(wrapper.element.hasAttribute('data-test')).toBe(true);
  });
});

function component() {
  return {
    template: `<div v-test="name"></div>`,
    props: ['name']
  };
}
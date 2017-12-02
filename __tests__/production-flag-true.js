import Vue from 'vue';
import { mount } from 'vue-test-utils';

import plugin from '../index';

Vue.use(plugin, {
  production: true
});

describe('settings.production === true', () => {
  it('does not add attribute to element', () => {
    const wrapper = mount(component(), {
      propsData: {
        name: 'person'
      }
    });

    expect(wrapper.element.hasAttribute('data-test')).toBe(false);
  });
});

function component() {
  return {
    template: `<div v-test="name"></div>`,
    props: ['name']
  };
}
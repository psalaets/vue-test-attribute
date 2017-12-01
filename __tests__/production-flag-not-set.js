import Vue from 'vue';
import { mount } from 'vue-test-utils';

import plugin from '../index';

process.env.NODE_ENV = 'production';

Vue.use(plugin, {});

describe('options.production not set', () => {
  it('uses process.env.NODE_ENV to determine production', () => {
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
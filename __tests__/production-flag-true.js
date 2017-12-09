import { createLocalVue, mount } from 'vue-test-utils';

import plugin from '../index';

let localVue;

describe('settings.production', () => {
  describe('set to true', () => {
    beforeEach(() => {
      localVue = createLocalVue();
      localVue.use(plugin, {
        production: true
      });
    });

    it('does not add attribute to element', () => {
      const wrapper = mount(component(), {
        propsData: {
          name: 'person'
        },
        localVue
      });

      expect(wrapper.element.hasAttribute('data-test')).toBe(false);
    });
  });

  describe('set to false', () => {
    beforeEach(() => {
      localVue = createLocalVue();
      localVue.use(plugin, {
        production: false
      });
    });

    it('adds attribute to element', () => {
      const wrapper = mount(component(), {
        propsData: {
          name: 'person'
        },
        localVue
      });

      expect(wrapper.element.hasAttribute('data-test')).toBe(true);
    });
  });

  describe('not set', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';

      localVue = createLocalVue();
      localVue.use(plugin, {});
    });

    it('uses process.env.NODE_ENV to determine production', () => {
      const wrapper = mount(component(), {
        propsData: {
          name: 'person'
        },
        localVue
      });

      expect(wrapper.element.hasAttribute('data-test')).toBe(false);
    });
  });
});

function component() {
  return {
    template: `<div v-test="name"></div>`,
    props: ['name']
  };
}
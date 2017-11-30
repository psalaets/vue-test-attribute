import Vue from 'vue';
import {mount} from 'vue-test-utils';

import plugin from '../index';

Vue.use(plugin);

describe('in production', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'production';
  });

  afterEach(() => {
    process.env.NODE_ENV = undefined;
  });

  it('does not add attribute to element', () => {
    const wrapper = mount(component(), {
      propsData: {
        name: 'person'
      }
    });

    expect(wrapper.element.hasAttribute('data-test')).toBe(false);
  });
});

describe('given a string value', () => {
  it('sets attribute to value', () => {
    const wrapper = mount(component(), {
      propsData: {
        name: 'person'
      }
    });

    expect(wrapper.element.getAttribute('data-test')).toBe('person');
  });

  it('updates attribute when value changes', () => {
    const wrapper = mount(component(), {
      propsData: {
        name: 'person'
      }
    });

    wrapper.setProps({
      name: 'updated-name'
    });

    expect(wrapper.element.getAttribute('data-test')).toBe('updated-name');
  });
});

describe('given array value', () => {
  it('sets attribute to array contents separated by spaces', () => {
    const wrapper = mount(component(), {
      propsData: {
        name: ['person', 'selected']
      }
    });

    expect(wrapper.element.getAttribute('data-test')).toBe('person selected');
  });

  it('updates attribute when array changes', () => {
    const wrapper = mount(component(), {
      propsData: {
        name: ['person']
      }
    });

    wrapper.setProps({
      name: ['ready', 'person']
    })

    expect(wrapper.element.getAttribute('data-test')).toBe('ready person');
  });
});

describe('given false', () => {
  it('does not set attribute', () => {
    const wrapper = mount(component(), {
      propsData: {
        name: false
      }
    });

    expect(wrapper.element.hasAttribute('data-test')).toBe(false);
  });

  it('removes existing attribute', () => {
    const wrapper = mount(component(), {
      propsData: {
        name: 'person'
      }
    });

    wrapper.setProps({
      name: false
    })

    expect(wrapper.element.hasAttribute('data-test')).toBe(false);
  })
});

function component() {
  return {
    template: `<div v-test="name"></div>`,
    props: ['name']
  };
}
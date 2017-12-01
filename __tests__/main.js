import Vue from 'vue';
import {mount} from 'vue-test-utils';

import plugin from '../index';

Vue.use(plugin);

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

describe('directly on a component', () => {
  it('adds attribute to component\'s root element', () => {
    const ChildComponent = {
      render: createElement => createElement('div')
    };

    const ParentComponent = {
      template: `<child-component v-test="'address'" />`,
      components: {
        'child-component': ChildComponent
      }
    };

    const wrapper = mount(ParentComponent);

    expect(wrapper.element.getAttribute('data-test')).toBe('address');
  });
});

function component() {
  return {
    template: `<div v-test="name"></div>`,
    props: ['name']
  };
}
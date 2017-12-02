import Vue from 'vue';
import {createRenderer} from 'vue-server-renderer';

import plugin from '../index';

Vue.config.productionTip = false;

describe('server side rendering', () => {
  describe('given a string value', () => {
    it('sets attribute to value', () => {
      const instance = new Vue(component('address'));
      const renderer = createRenderer({
        directives: {
          test: plugin.ssr()
        }
      });

      return renderer.renderToString(instance, (err, html) => {
        if (err) throw err;

        expect(html).toMatchSnapshot();
      });
    });
  });

  describe('given array value', () => {
    it('sets attribute to array contents separated by spaces', () => {
      const instance = new Vue(component(['address', 'address-1']));
      const renderer = createRenderer({
        directives: {
          test: plugin.ssr()
        }
      });

      return renderer.renderToString(instance, (err, html) => {
        if (err) throw err;

        expect(html).toMatchSnapshot();
      });
    });
  });

  describe('given false', () => {
    it('does not set attribute', () => {
      const instance = new Vue(component(false));
      const renderer = createRenderer({
        directives: {
          test: plugin.ssr()
        }
      });

      return renderer.renderToString(instance, (err, html) => {
        if (err) throw err;

        expect(html).toMatchSnapshot();
      });
    });
  });
});

function component(name) {
  return {
    template: `<div v-test="name"></div>`,
    props: ['name'],
    propsData: {
      name
    }
  };
}
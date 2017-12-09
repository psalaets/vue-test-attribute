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

  describe('settings.production === true', () => {
    it('does not add attribute to element', () => {
      const instance = new Vue(component('address'));
      const renderer = createRenderer({
        directives: {
          test: plugin.ssr({
            production: true
          })
        }
      });

      return renderer.renderToString(instance, (err, html) => {
        if (err) throw err;

        expect(html).toMatchSnapshot();
      });
    });
  });

  describe('settings.production === false', () => {
    it('adds attribute to element', () => {
      const instance = new Vue(component('address'));
      const renderer = createRenderer({
        directives: {
          test: plugin.ssr({
            production: false
          })
        }
      });

      return renderer.renderToString(instance, (err, html) => {
        if (err) throw err;

        expect(html).toMatchSnapshot();
      });
    });
  });

  describe('settings.production not set', () => {
    let oldNodeEnv = process.env.NODE_ENV;

    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });

    afterEach(() => {
      process.env.NODE_ENV = oldNodeEnv;
    });

    it('uses process.env.NODE_ENV to determine production', () => {
      const instance = new Vue(component('address'));
      const renderer = createRenderer({
        directives: {
          test: plugin.ssr({})
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
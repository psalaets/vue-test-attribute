# vue-test-attribute

Vue 2 directive that adds `data-test` attribute to elements

## Install

```bash
npm install vue-test-attribute
```

## Usage

### 1. Bring it in to your app

```js
import Vue from 'vue';
import VueTestAttribute from 'vue-test-attribute';

Vue.use(VueTestAttribute);
```

### 2a. Use with string literal

```html
<div v-test="'address'"></div>
```

renders

```html
<div data-test="address"></div>
```

### 2b. Use with string value

```html
<div v-test="testId"></div>
```

```js
data() {
  return {
    testId: 'address'
  };
}
```

renders

```html
<div data-test="address"></div>
```

### 2c. Use with array value

```html
<div v-test="testIds"></div>
```

```js
data() {
  return {
    testIds: ['address', 'address-1']
  };
}
```

renders

```html
<div data-test="address address-1"></div>
```

### 2d. Use with `false` value

```html
<div v-test="testId"></div>
```

```js
data() {
  return {
    testId: false
  };
}
```

renders

```html
<div></div>
```

(`data-test` is not added to element)

### 3. Find element in a test

Using an [attribute selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors).

```js
const el = document.querySelector('[data-test~="address"]');

assert(...);
```

## Settings

You can pass an object of settings to `Vue.use()` to control this directive's behavior.

```js
const settings = {...};

Vue.use(VueTestAttribute, settings);
```

### settings.production

| Value | Behavior |
|-------|----------|
| `false` | `data-test` attributes will be added |
| `true` | `data-test` attributes will *not* be added |
| (not set) | Behavior is based on value of `process.env.NODE_ENV === "production"` |

## Server-side rendering

```js
import VueTestAttribute from 'vue-test-attribute';
import {createRenderer} from 'vue-server-renderer';

// create renderer
const renderer = createRenderer({
  directives: {
    // configure renderer with VueTestAttribute
    test: VueTestAttribute.ssr()
  }
});
```

`VueTestAttribute.ssr()` accepts an optional settings object. See above for details on settings.

## FAQ

### Q1: Why not just find elements by content/class/id/xpath in tests?

A1: https://blog.kentcdodds.com/making-your-ui-tests-resilient-to-change-d37a6ee37269

### Q2: Why not just use

```vue
<div :data-test="testId" />
```

A2: That will work fine but with this directive

- If you typo the directive name Vue will report an error
- It's easier to ensure uniformity in the `data-` attribute used
- Arrays are joined for you
- `data-test` attributes won't be added in production builds

## License

MIT
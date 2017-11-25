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
import vueTestAttribute from 'vue-test-attriibute';

Vue.use(vueTestAttribute);
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

### 3. Find element in a test

```js
const el = document.querySelector('[data-test~="address"]');

assert(...);
```

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

## License

MIT
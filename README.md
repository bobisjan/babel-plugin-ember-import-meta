# babel-plugin-ember-import-meta

[![CI](https://github.com/bobisjan/babel-plugin-ember-import-meta/actions/workflows/ci.yml/badge.svg)](https://github.com/bobisjan/babel-plugin-ember-import-meta/actions/workflows/ci.yml)

A babel plugin to support `import.meta.*` for Ember.js applications

## Compatibility

- Vite or Webpack based Ember.js application

## Installation

```zsh
pnpm add -D babel-plugin-ember-import-meta
```

```js
// babel.config.js
import {
  babelImportMeta,
  templateImportMeta,
} from 'babel-plugin-ember-import-meta';

export default {
  plugins: [
    [
      'babel-plugin-ember-template-compilation',
      {
        compilerPath: 'ember-source/dist/ember-template-compiler.js',
        transforms: [templateImportMeta],
      },
    ],
    babelImportMeta,
  ],
};
```

Make sure that Vite or Webpack is properly configured to import assets using `import asset from 'module'` static declarations.

## Usage

```gjs
// app/components/index.gjs
const logo = import.meta.resolve('./logo.png');

<template>
  <img src={{logo}}>

  {{#if import.meta.env.SSR}}
    <h1>Hello, from SSR</h1>
  {{else}}
    <h1>Hello, from browser</h1>
  {{/if}}

  <p>The URL of this module is {{import.meta.url}}</p>

  <img src={{import.meta.resolve "./footer.png"}}>
</template>
```

The `import.meta.env.*` variables depend on support of Vite or Webpack.

## License

This project is licensed under the [MIT License](LICENSE.md).

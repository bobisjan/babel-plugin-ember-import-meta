import assert from 'node:assert/strict';
import { test } from 'node:test';

import { transform } from './helpers.js';

test('template', async (t) => {
  t.test('{{import.meta.url}}', async () => {
    let transformed = await transform(
      `<template><h1>{{import.meta.url}}</h1></template>`,
    );

    assert.strictEqual(
      transformed,
      `import { setComponentTemplate } from "@ember/component";
import { createTemplateFactory } from "@ember/template-factory";
import templateOnly from "@ember/component/template-only";
let a = import.meta.url;
export default setComponentTemplate(createTemplateFactory(
/*
  <h1>{{import.meta.url}}</h1>
*/
{
  "id": "index",
  "block": "[[[10,\\"h1\\"],[12],[1,[32,0]],[13]],[],[]]",
  "moduleName": "/index.gjs",
  "scope": () => [a],
  "isStrictMode": true
}), templateOnly());`,
    );
  });

  await test('{{import.meta.env.SSR}}', async () => {
    let transformed = await transform(
      `<template><h1>{{import.meta.env.SSR}}</h1></template>`,
    );

    assert.strictEqual(
      transformed,
      `import { setComponentTemplate } from "@ember/component";
import { createTemplateFactory } from "@ember/template-factory";
import templateOnly from "@ember/component/template-only";
let a = import.meta.env.SSR;
export default setComponentTemplate(createTemplateFactory(
/*
  <h1>{{import.meta.env.SSR}}</h1>
*/
{
  "id": "index",
  "block": "[[[10,\\"h1\\"],[12],[1,[32,0]],[13]],[],[]]",
  "moduleName": "/index.gjs",
  "scope": () => [a],
  "isStrictMode": true
}), templateOnly());`,
    );
  });

  await t.test('{{import.meta.resolve}}', async () => {
    let transformed = await transform(
      `<template><img src={{import.meta.resolve "./foo.png"}} /></template>`,
    );

    assert.strictEqual(
      transformed,
      `let a = _ref0;
import _ref0 from "./foo.png";
import { setComponentTemplate } from "@ember/component";
import { createTemplateFactory } from "@ember/template-factory";
import templateOnly from "@ember/component/template-only";
export default setComponentTemplate(createTemplateFactory(
/*
  <img src={{import.meta.resolve "./foo.png"}} />
*/
{
  "id": "index",
  "block": "[[[10,\\"img\\"],[15,\\"src\\",[32,0]],[12],[13]],[],[]]",
  "moduleName": "/index.gjs",
  "scope": () => [a],
  "isStrictMode": true
}), templateOnly());`,
    );
  });

  await t.test('(import.meta.resolve)', async () => {
    let transformed = await transform(
      `<template>{{#let (import.meta.resolve "./foo.png") as |foo|}}{{foo}}{{/let}}</template>`,
    );

    assert.strictEqual(
      transformed,
      `let a = _ref0;
import _ref0 from "./foo.png";
import { setComponentTemplate } from "@ember/component";
import { createTemplateFactory } from "@ember/template-factory";
import templateOnly from "@ember/component/template-only";
export default setComponentTemplate(createTemplateFactory(
/*
  {{#let (import.meta.resolve "./foo.png") as |foo|}}{{foo}}{{/let}}
*/
{
  "id": "index",
  "block": "[[[44,[[32,0]],[[[1,[30,1]]],[1]]]],[\\"foo\\"],[\\"let\\"]]",
  "moduleName": "/index.gjs",
  "scope": () => [a],
  "isStrictMode": true
}), templateOnly());`,
    );
  });
});

import * as babel from '@babel/core';
import { Preprocessor } from 'content-tag';

import { babelImportMeta, templateImportMeta } from '#src';

export async function transform(code) {
  let p = new Preprocessor();

  let result = await babel.transformAsync(p.process(code).code, {
    filename: 'index.gjs',
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
  });

  return result.code
    .trim()
    .replaceAll(process.cwd(), '')
    .replaceAll(/"id": "[a-zA-Z0-9/]+"/g, '"id": "index"');
}

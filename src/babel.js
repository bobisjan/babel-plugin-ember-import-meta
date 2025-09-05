import { addDefault } from '@babel/helper-module-imports';

export function babelImportMeta(babel) {
  const { types: t } = babel;

  return {
    name: 'ember-import-meta',
    visitor: {
      CallExpression(path) {
        if (
          t.isMemberExpression(path.node.callee) &&
          t.isMetaProperty(path.node.callee.object) &&
          path.node.callee.object.meta.name === 'import' &&
          path.node.callee.object.property.name === 'meta' &&
          t.isIdentifier(path.node.callee.property) &&
          path.node.callee.property.name === 'resolve'
        ) {
          if (path.node.arguments.length === 1) {
            if (t.isStringLiteral(path.node.arguments[0])) {
              path.replaceWith(addDefault(path, path.node.arguments[0].value));
            }
          }
        }
      },
    },
  };
}

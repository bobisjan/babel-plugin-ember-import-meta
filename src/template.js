export function templateImportMeta(env) {
  return {
    visitor: {
      PathExpression(node, path) {
        if (
          node.original === 'import.meta.url' ||
          node.original.startsWith('import.meta.env.')
        ) {
          return env.syntax.builders.path(
            env.meta.jsutils.bindExpression(node.original, path),
          );
        }
      },
      MustacheStatement(node, path) {
        if (node.path.original === 'import.meta.resolve') {
          if (node.params.length === 1) {
            if (node.params[0].type === 'StringLiteral') {
              return env.syntax.builders.mustache(
                env.meta.jsutils.bindExpression(
                  (context) => context.import(node.params[0].value, 'default'),
                  path,
                ),
              );
            }
          }
        }
      },
      SubExpression(node, path) {
        if (node.path.original === 'import.meta.resolve') {
          if (node.params.length === 1) {
            if (node.params[0].type === 'StringLiteral') {
              return env.syntax.builders.path(
                env.meta.jsutils.bindExpression(
                  (context) => context.import(node.params[0].value, 'default'),
                  path,
                ),
              );
            }
          }
        }
      },
    },
  };
}

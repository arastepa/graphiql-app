import prettier from 'prettier/standalone';
import prettierPluginGraphql from 'prettier/plugins/graphql';

export const formatGraphQL = (query) => {
  return prettier.format(query, {
    parser: 'graphql',
    plugins: [prettierPluginGraphql],
  });
};

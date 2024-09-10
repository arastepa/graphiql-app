import gqlPrettier from 'graphql-prettier';

export const formatGraphQL = (query) => {
  return gqlPrettier(query);
};

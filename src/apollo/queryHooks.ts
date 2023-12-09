import {useQuery} from '@apollo/client';
import {graphql} from '../gql';

export const useGetAllStarships = () => {
  const allStarshipsQueryDocument = graphql(/* GraphQL */ `
    query allStarshipsQuery {
      allStarships {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `);

  return useQuery(allStarshipsQueryDocument);
};

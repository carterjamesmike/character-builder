import { gql } from '@apollo/client';

export const QUERY_ALL_SPECIES = gql`
  query GetAllSpecies {
    species {
      id
      name
      skinColorOptions
      hairColorOptions
      eyeColorOptions
      distinctions
      heightAverage
      weightAverage
      homeworld
      language
      flavorText
      size
      contentType
      contentSource
      traits {
        name
        description
      }
      imageUrls
    }
  }
`;

export const QUERY_SPECIES_BY_ID = gql`
  query GetSpeciesById($id: ID!) {
    speciesById(id: $id) {
      id
      name
      skinColorOptions
      hairColorOptions
      eyeColorOptions
      distinctions
      heightAverage
      weightAverage
      homeworld
      language
      flavorText
      size
      contentType
      contentSource
      traits {
        name
        description
      }
      imageUrls
    }
  }
`;
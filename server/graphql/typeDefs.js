const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar JSON
    scalar DateTime

    type Species {
        id: ID!
        name: String!
        skinColorOptions: String
        hairColorOptions: String
        eyeColorOptions: String
        distinctions: String
        heightAverage: String
        heightRollMod: String
        weightAverage: String
        weightRollMod: String
        homeworld: String
        flavorText: String
        colorScheme: JSON
        manufacturer: JSON
        language: String
        traits: [Trait!]!
        traitJson: String
        abilitiesIncreased: [[AbilityIncrease!]!]!
        abilitiesIncreasedJson: String
        imageUrls: [String!]!
        imageUrlsJson: String
        size: String
        halfHumanTableEntries: JSON
        halfHumanTableEntriesJson: String
        features: [JSON!]!
        contentTypeEnum: Int
        contentType: String
        contentSourceEnum: Int
        contentSource: String
        partitionKey: String
        rowKey: String
        timestamp: DateTime
        eTag: String
    }

    type Trait {
        name: String!
        description: String!
    }

    type AbilityIncrease {
        abilities: [String!]!
        abilitiesJson: String!
        amount: Int!
    }

    type Query {
        species: [Species!]!
        speciesById(id: ID!): Species
    }

    type Mutation {
        createSpecies(input: SpeciesInput!): Species!
        updateSpecies(id: ID!, input: SpeciesInput!): Species!
        deleteSpecies(id: ID!): Boolean!
    }

    input SpeciesInput {
        name: String!
        skinColorOptions: String
        hairColorOptions: String
        eyeColorOptions: String
        distinctions: String
        heightAverage: String
        heightRollMod: String
        weightAverage: String
        weightRollMod: String
        homeworld: String
        flavorText: String
        colorScheme: JSON
        manufacturer: JSON
        language: String
        traits: [TraitInput!]!
        traitJson: String
        abilitiesIncreased: [[AbilityIncreaseInput!]!]!
        abilitiesIncreasedJson: String
        imageUrls: [String!]!
        imageUrlsJson: String
        size: String
        halfHumanTableEntries: JSON
        halfHumanTableEntriesJson: String
        features: [JSON!]!
        contentTypeEnum: Int
        contentType: String
        contentSourceEnum: Int
        contentSource: String
        partitionKey: String
        rowKey: String
        eTag: String
    }

    input TraitInput {
        name: String!
        description: String!
    }

    input AbilityIncreaseInput {
        abilities: [String!]!
        abilitiesJson: String!
        amount: Int!
    }
`;

module.exports = typeDefs;
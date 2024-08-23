const { Species } = require('../models');
const { ApolloError } = require('apollo-server-express');
const { AuthenticationError } = require('apollo-server-express');
const { generateToken } = require('../utils/auth');

const resolvers = {

    Query: {
        species: async () => {
        return await Species.find({});
        },
        speciesById: async (parent, { id }) => {
        return await Species.findById(id);
        }
    },
    
    Mutation: {
        createSpecies: async (parent, { input }) => {
        const species = await Species.create(input);
        return species;
        }
    }
    };

module.exports = resolvers;

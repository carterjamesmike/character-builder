const { Species, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { generateToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      if (context.user) {
        return await User.find({});
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    user: async (parent, { username }) => {
      return await User.findOne({
        username,
      });
    },
    species: async () => {
      return await Species.find({});
    },
    speciesById: async (parent, { id }) => {
      return await Species.findById(id);
    },
  },

  Mutation: {
    createSpecies: async (parent, { input }) => {
      const species = await Species.create(input);
      return species;
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({
        username,
      });

      if (!user) {
        throw new AuthenticationError("Incorrect username or password");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect username or password");
      }
      const token = generateToken(user._id);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = generateToken(user._id);
      return { token, user };
    },
    updateUser: async (parent, { id, username, email, password }) => {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { username, email, password },
        { new: true }
      );
      return updatedUser;
    },
  },
};

module.exports = resolvers;

const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { username }) => {
            return User.findOne({
                $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
              })
            .select('-__v -password')
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            
            return { token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('Incorrect login credentials!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect login credentials!');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async ( parent, {bookData}, context ) => {
            if(context.user) {
                const updateUser = await User.findByIdandUpdate(
                    {_id: context.user._id},
                    { $addToSet: {savedBooks: bookData}},
                    {new: true}
                );
                return updateUser;
            }
            throw new AuthenticationError("You must be logged in to save a book!")
        },
        deleteBook: async ( parent, {bookId}, context ) => {
            if(context.user) {
                const updateUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: {bookId} } },
                    {new: true}
                );

                return updateUser;
            }

            throw new AuthenticationError("You must be logged in to delete a book from your collection!")
        }
    }
}

module.exports = resolvers;
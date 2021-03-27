const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        me: User
        users: [User]
        user(username: String!): User
    }

    input saveBook {
        authors: [String]
        description: String
        title: String
        bookId: ID!
        image: String
        link: String
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: saveBook!): User
        deleteBook(bookId: ID!): User  

    }

    type User {
        _id: ID!
        username: String!        
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String!
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

`

module.exports = typeDefs;
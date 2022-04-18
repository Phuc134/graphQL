const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Book {
    id: ID
    name: String
    genre: String
    author: Author
  }

  type Author {
    id: ID
    name: String
    age: Int
    books: [Book]
  }

  type SignInResponse {
    token: String
    error: String
  }

  type SignUpResponse {
    status: String
    error: String
  }

  # ROOT TYPE
  type Query {
    books: [Book]
    book(id: ID): Book
    authors: [Author]
    author(id: ID): Author
  }

  # MUTATION
  type Mutation {
    login(username: String, password: String): SignInResponse
    signUp(username: String, password: String, role: String): SignUpResponse
    createAuthor(name: String, age: Int): Author
    createBook(name: String, genre: String, authorID: String): Book
    updateBook(id: ID!, name: String, gener: String, authorID: String): Book
    deleteBook(id: ID!): Book
  }
`;

module.exports = typeDefs;

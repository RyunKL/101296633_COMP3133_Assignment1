const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    salary: Float!
  }

  input CreateEmployeeInput {
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    salary: Float!
  }

  input UpdateEmployeeInput {
    id: ID!
    firstName: String
    lastName: String
    email: String
    gender: String
    salary: Float
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    id: ID!
    username: String
    email: String
    password: String
  }

  type Query {
    getEmployees: [Employee!]!
    getEmployeeById(id: ID!): Employee
    getUsers: [User!]!
    getUserById(id: ID!): User
  }

  type Mutation {
    createEmployee(input: CreateEmployeeInput!): Employee!
    updateEmployee(input: UpdateEmployeeInput!): Employee!
    deleteEmployee(id: ID!): Employee
    createUser(input: CreateUserInput!): User!
    updateUser(input: UpdateUserInput!): User!
    deleteUser(id: ID!): User
  }
`;

module.exports = typeDefs;

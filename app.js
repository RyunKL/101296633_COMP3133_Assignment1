const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); // This package is used to generate unique IDs
const mongoose = require('mongoose');
const typeDefs = require('./models/graphQL/Schema')
const User = require('./models/mongoDB/User')
const Employee = require('./models/mongoDB/Employee')

// Connect to MongoDB
mongoose.connect('mongodb+srv://rootadmin:m5NvavxMIOPodOKz@clusterrl.wd5fhyo.mongodb.net/comp3133_assignment1');

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define your resolver functions
const resolvers = {
    Query: {
      getEmployees: async () => await Employee.find(),
      getEmployeeById: async (_, { id }) => await Employee.findById(id),
      getUsers: async () => await User.find(),
    },
    Mutation: {
      createEmployee: async (_, { input }) => await Employee.create(input),
      updateEmployee: async (_, { input }) => {
        const { id, ...update } = input;
        return await Employee.findByIdAndUpdate(id, update, { new: true });
      },
      deleteEmployee: async (_, { id }) => await Employee.findByIdAndRemove(id),
      createUser: async (_, { input }) => {
        const hashedPassword = await bcrypt.hash(input.password, 10);
        return await User.create({ ...input, password: hashedPassword });
      },
    },
  };

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Initialize Express app
const app = express();

// Start the server and apply Apollo middleware to Express
async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

// Call the asynchronous function to start the server
startApolloServer().then(() => {
  // Start the Express server
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

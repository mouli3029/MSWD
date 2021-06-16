const { ApolloServer, gql } = require('apollo-server-express');
var express = require('express');
const { v1: uuid } = require('uuid')

var app = express();

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String! 
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Mutation {

    addBook(
      title: String!
      published: Int!
      author: String! 
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    findBook(title: String!): Book
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: (root) => authors.length, 
    allBooks: (root, args) => {
      var authBooks = books
      if (args.author) {
        authBooks = authBooks.filter(b => b.author == args.author)
      }
      if (args.genre) {
        authBooks = authBooks.filter(b => b.genres.includes(args.genre))
      }
      return authBooks
    },
    allAuthors: (root) => {
      var authBooks
      var updateAuthors = []
      authors.map (auth => {
        authBooks = books.filter(b => b.author == auth.name)
        auth = { ...auth, bookCount: authBooks.length}
        updateAuthors = updateAuthors.concat (auth)
      })
      return authors = updateAuthors
    },
    findBook: (root, args) =>
      books.find(p => p.title === args.title)
  },

  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      if (!authors.find(p => p.name === args.author)) {
        var author = { name: args.author, id: uuid() }
        authors = authors.concat(author)
      }
      return book
    },

    editAuthor: (root, args) => {
      const author = authors.find(p => p.name === args.name)
      if (!author) {
        return null
      }

      const updatedauthor = { ...author, born: args.setBornTo }
      authors = authors.map(p => p.name === args.name ? updatedauthor : p)
      return updatedauthor
    }   

  }

}

var server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

var PORT = 8081;

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:8081${server.graphqlPath}`)
)

console.log('Server running at http://127.0.0.1:8081/');
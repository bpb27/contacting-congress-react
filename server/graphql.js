const { ApolloServer, gql } = require('apollo-server-express');
const {
  filterByChamber,
  filterByGender,
  filterByName,
  filterByParty,
  filterByState,
  filterByZip,
} = require('./filters');

const typeDefs = gql`
  type Query {
    legislators(
      chamber: Chamber
      gender: Gender
      name: String
      party: Party
      state: State
      zipCode: String
    ): [Legislator!]!
  }

  type Legislator {
    # primary
    birthday: String
    chamber: String!
    district: String
    firstName: String!
    fullName: String!
    gender: String
    id: Int!
    lastName: String!
    party: String!
    state: String!

    # page & contact
    address: String
    contactForm: String
    phone: String
    url: String

    # socials
    facebook: String
    twitter: String
    type: String
    youtube: String

    # external ids
    ballotpediaId: String
    bioguideId: String
    cspanId: String
    govtrackId: String
    lisId: String
    opensecretsId: String
    thomasId: String
    votesmartId: String
    wikipediaId: String
    youtubeId: String
  }

  enum Chamber {
    house
    senate
  }

  enum Gender {
    female
    male
  }

  enum Party {
    democrat
    independent
    republican
  }

  enum State {
    AL
    AK
    AZ
    AR
    CA
    CO
    CT
    DE
    FL
    GA
    HI
    ID
    IL
    IN
    IA
    KS
    KY
    LA
    ME
    MD
    MA
    MI
    MN
    MS
    MO
    MT
    NE
    NV
    NH
    NJ
    NM
    NY
    NC
    ND
    OH
    OK
    OR
    PA
    RI
    SC
    SD
    TN
    TX
    UT
    VT
    VA
    WA
    WV
    WI
    WY
  }
`;

const resolvers = {
  Query: {
    legislators: (_, params, context) => {
      let response = context.cache.get('legislators');
      response = filterByZip(response, params, context);
      response = filterByState(response, params, context);
      response = filterByChamber(response, params, context);
      response = filterByName(response, params, context);
      response = filterByGender(response, params, context);
      response = filterByParty(response, params, context);
      return response;
    },
  },
  Legislator: {
    chamber: ({ type }) => {
      return type === 'sen' ? 'senate' : 'house';
    },
    gender: ({ gender }) => {
      return gender === 'M' ? 'male' : 'female';
    },
  },
};

const setupGraphQL = ({ app, cache, pool }) => {
  const server = new ApolloServer({
    context: () => ({ cache, pool }),
    resolvers,
    typeDefs,
  });
  server.applyMiddleware({ app });
};

module.exports = setupGraphQL;

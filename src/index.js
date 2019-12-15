import { buildASTSchema, parse, buildSchema, graphql } from "graphql";
import util from "util";
// kinds NamedType, NonNullType

var prog = `
  enum LengthUnit {
    METER
  }

  type Episode {
    id: ID!
    name: String!
    length(unit: LengthUnit = METER): Float
  }

  type Character {
    name: String!
    appearsIn: [Episode!]!
  }
`;

const tyDecls = parse(prog);
const schema2 = buildASTSchema(tyDecls);

console.log(util.inspect(tyDecls, {showHidden: false, depth: null}));
//tyDecls.definitions.map(dumpTyDecl)

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});


import type { CodegenConfig } from '@graphql-codegen/cli';
// /Users/lynnsugut/Amaken/enibo-core-ui/src/components/branch-list/query.ts

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://192.168.1.45:4000/graphql",
  documents: "./src/components/branch-list/*.ts",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: []
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;

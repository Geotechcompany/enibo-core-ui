

  import { gql } from "@apollo/client";

const queryBranchTypesList = gql`
query BranchTypes {
    branchTypes {
      branchTypeName
      description
      modifiedBy
      modifiedOn
    }
}`

  export default queryBranchTypesList;
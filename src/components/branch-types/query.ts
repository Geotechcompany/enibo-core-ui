

  import { gql } from "@apollo/client";

const queryBranchTypesList = gql`
query BranchTypes {
    branchTypes {
      branchTypeId
      branchTypeName
      description
      modifiedBy
      modifiedOn
      createdAt
      updatedAt
    }
}`

  export default queryBranchTypesList;
import { gql } from "@apollo/client";

export const CREATE_BranchType = gql`
  mutation CreateBranchType(
    $branchTypeName: String!
    $description: String!
    $modifiedBy: String!
    $modifiedOn: String!
  ) {
    createBranchType(
      branchTypeName: $branchTypeName
      description: $description
      modifiedBy: $modifiedBy
      modifiedOn: $modifiedOn
    ) {
      branchTypeName
      description
      modifiedBy
      modifiedOn
    }
  }
`;

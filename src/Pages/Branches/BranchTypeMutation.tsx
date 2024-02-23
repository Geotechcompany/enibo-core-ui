import { gql } from "@apollo/client";

const CREATE_NEW_BRANCH_TYPE_MUTATION = gql`
mutation CreateBranchType($branchTypeName: String!, $description: String!, $modifiedBy: String!, $modifiedOn: String!) {
    createBranchType(branchTypeName: $branchTypeName, description: $description, modifiedBy: $modifiedBy, modifiedOn: $modifiedOn) {
      branchTypeName
      description
      modifiedBy
      modifiedOn
    }
  }
`;

export default CREATE_NEW_BRANCH_TYPE_MUTATION;

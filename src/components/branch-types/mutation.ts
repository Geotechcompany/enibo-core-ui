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

export const DELETE_BRANCH_TYPE = gql`
  mutation Mutation($branchTypeId: String!) {
    deleteBranchType(branchTypeId: $branchTypeId) {
      branchTypeId
      branchTypeName
      description
      modifiedBy
      modifiedOn
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_BRANCH_TYPE = gql`
  mutation UpdateBranchType(
    $branchTypeId: String!
    $branchTypeName: String!
    $description: String!
    $modifiedBy: String!
    $modifiedOn: String!
  ) {
    updateBranchType(
      branchTypeId: $branchTypeId
      branchTypeName: $branchTypeName
      description: $description
      modifiedBy: $modifiedBy
      modifiedOn: $modifiedOn
    ) {
      branchTypeId
      branchTypeName
      description
      modifiedBy
      modifiedOn
    }
  }
`;

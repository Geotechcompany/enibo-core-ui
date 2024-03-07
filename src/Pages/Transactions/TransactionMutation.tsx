import { gql } from "@apollo/client";

// Define the mutation
export const CREATE_NEW_TRANSACTION_TYPE_MUTATION = gql`
  mutation CreateTransactionType(
    $transactionTypeName: String!
    $transactionTypeCode: String!
    $description: String!
    $currency: String!
    $modifiedBy: String!
    $modifiedOn: String!
  ) {
    createTransactionType(
      transactionTypeName: $transactionTypeName
      transactionTypeCode: $transactionTypeCode
      description: $description
      currency: $currency
      modifiedBy: $modifiedBy
      modifiedOn: $modifiedOn
    ) {
      transactionTypeName
      transactionTypeCode
      description
      currency
      modifiedBy
      modifiedOn
    }
  }
`;

export const DELETE_TRANSACTION_TYPE_MUTATION = gql`
mutation DeleteTransactionType($transactionTypeId: String!) {
  deleteTransactionType(transactionTypeId: $transactionTypeId) {
    transactionTypeId
    transactionTypeName
    transactionTypeCode
    description
    currency
    modifiedBy
    modifiedOn
  }
}
`;

export const UPDATE_TRANSACTION_TYPE_MUTATION = gql`
  mutation UpdateTransactionType(
    $transactionTypeId: String!
    $transactionTypeName: String!
    $transactionTypeCode: String!
    $description: String!
    $currency: String!
    $modifiedBy: String!
    $modifiedOn: String!
  ) {
    updateTransactionType(
      transactionTypeId: $transactionTypeId
      transactionTypeName: $transactionTypeName
      transactionTypeCode: $transactionTypeCode
      description: $description
      currency: $currency
      modifiedBy: $modifiedBy
      modifiedOn: $modifiedOn
    ) {
      transactionTypeId
      transactionTypeName
      transactionTypeCode
      description
      currency
      modifiedBy
      modifiedOn
    }
  }
`;

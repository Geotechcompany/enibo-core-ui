

import { gql } from "@apollo/client";

export const CREATE_TRANSACTION_TYPE_LIST = gql`
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










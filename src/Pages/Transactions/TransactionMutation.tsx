import { gql } from "@apollo/client";

// Define the mutation
const CREATE_NEW_TRANSACTION_TYPE_MUTATION = gql`
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

export default CREATE_NEW_TRANSACTION_TYPE_MUTATION;

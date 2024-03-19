import { gql } from "@apollo/client";

// Define the mutation
const CREATE_FEE_TYPE_MUTATION = gql`
  mutation CreateFeeType(
    $feeTypeName: String!
    $description: String!
    $transactionTypes: [String]!
    $paymentFrequency: String!
    $effectiveDate: String!
    $fixedRate: String!
    $modifiedBy: String!
    $modifiedOn: String!
  ) {
    createFeeType(
      feeTypeName: $feeTypeName
      description: $description
      transactionTypes: $transactionTypes
      paymentFrequency: $paymentFrequency
      effectiveDate: $effectiveDate
      fixedRate: $fixedRate
      modifiedBy: $modifiedBy
      modifiedOn: $modifiedOn
    ) {
      feeTypeName
      description
      transactionTypes {
        transactionTypeId
        transactionTypeName
        transactionTypeCode
        description
        currency
        modifiedBy
        modifiedOn
      }
      paymentFrequency
      effectiveDate
      fixedRate
      modifiedBy
      modifiedOn
    }
  }
`;

export default CREATE_FEE_TYPE_MUTATION;

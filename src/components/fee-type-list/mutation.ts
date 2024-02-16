

  import { gql } from "@apollo/client";

export const CREATE_FEE_TYPE_LIST = gql`
  mutation CreateFeeType(
    $feeTypeName: String!
    $description: String!
    $transactionTypes: [String]!
    $paymentFrequency: String!
    $effectiveDate: String!
    $fixedRate: Float!
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
      transactionTypes
      paymentFrequency
      effectiveDate
      fixedRate
      modifiedBy
      modifiedOn
    }
  }
`;










import { gql } from "@apollo/client";

export const CREATE_BRANCH = gql`
  mutation CreateFeeType(
    $feeName: String!
    $description: String!
    $transactionTypes: [String]!
    $paymentFrequency: String!
    $effectiveDate: String!
    $fixedRate: Float!
    $modifiedBy: String!
    $modifiedOn: String!
  ) {
    createFeeType(
      feeName: $feeName
      description: $description
      transactionTypes: $transactionTypes
      paymentFrequency: $paymentFrequency
      effectiveDate: $effectiveDate
      fixedRate: $fixedRate
      modifiedBy: $modifiedBy
      modifiedOn: $modifiedOn
    ) {
      feeName
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










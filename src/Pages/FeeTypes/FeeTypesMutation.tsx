import { gql } from "@apollo/client";

// Define the mutation
const CREATE_FEE_TYPE_MUTATION = gql`
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

export default CREATE_FEE_TYPE_MUTATION;

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

export const UPDATE_FEE_TYPE_MUTATION = gql`
 mutation UpdateFeeType($feeTypeId: String, $feeTypeName: String, $description: String, $transactionTypes: [String], $paymentFrequency: String, $effectiveDate: String, $fixedRate: String, $modifiedBy: String, $modifiedOn: String) {
  updateFeeType(feeTypeId: $feeTypeId, feeTypeName: $feeTypeName, description: $description, transactionTypes: $transactionTypes, paymentFrequency: $paymentFrequency, effectiveDate: $effectiveDate, fixedRate: $fixedRate, modifiedBy: $modifiedBy, modifiedOn: $modifiedOn) {
    feeTypeId
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

export const DELETE_FEE_TYPE_LIST = gql`
mutation DeleteFeeType($feeTypeId: String) {
  deleteFeeType(feeTypeId: $feeTypeId) {
    feeTypeId
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

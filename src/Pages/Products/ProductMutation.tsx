import { gql } from "@apollo/client";

// Define the mutation
const CREATE_PRODUCT_TYPE_MUTATION = gql`
  mutation CreateProductType(
    $productTypeName: String!
    $productType: String!
    $description: String!
    $active: Boolean!
    $interestBearing: Boolean!
    $fixedInterestRate: Float!
    $effectiveDate: String!
    $fees: String!
    $feeTypes: [String]!
    $riskRating: String!
    $prefix: String!
    $numberSchema: String!
    $startingValue: String!
    $modifiedBy: String!
    $modifiedOn: String!
  ) {
    createProductType(
      productTypeName: $productTypeName
      productType: $productType
      description: $description
      active: $active
      interestBearing: $interestBearing
      fixedInterestRate: $fixedInterestRate
      effectiveDate: $effectiveDate
      fees: $fees
      feeTypes: $feeTypes
      riskRating: $riskRating
      prefix: $prefix
      numberSchema: $numberSchema
      startingValue: $startingValue
      modifiedBy: $modifiedBy
      modifiedOn: $modifiedOn
    ) {
      productTypeName
      productType
      description
      active
      interestBearing
      fixedInterestRate
      effectiveDate
      fees
      feeTypes
      riskRating
      prefix
      numberSchema
      startingValue
      modifiedBy
      modifiedOn
    }
  }
`;

export default CREATE_PRODUCT_TYPE_MUTATION;

import { gql } from "@apollo/client";

// Define the mutation
export const CREATE_PRODUCT_TYPE_MUTATION = gql`
mutation CreateProductType($productTypeName: String!, $description: String!, $active: Boolean!, $interestBearing: Boolean!, $fixedInterestRate: Float!, $effectiveDate: String!, $fees: String!, $feeTypes: [String]!, $riskRating: String!, $prefix: String!, $numberSchema: String!, $startingValue: String!, $modifiedBy: String!, $modifiedOn: String!) {
  createProductType(productTypeName: $productTypeName, description: $description, active: $active, interestBearing: $interestBearing, fixedInterestRate: $fixedInterestRate, effectiveDate: $effectiveDate, fees: $fees, feeTypes: $feeTypes, riskRating: $riskRating, prefix: $prefix, numberSchema: $numberSchema, startingValue: $startingValue, modifiedBy: $modifiedBy, modifiedOn: $modifiedOn) {
    productTypeName
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

export const DELETE_PRODUCT_TYPE = gql`
mutation DeleteProductType($productTypeId: String!) {
  deleteProductType(productTypeId: $productTypeId) {
    productTypeId
    productTypeName
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
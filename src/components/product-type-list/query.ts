import { gql } from "@apollo/client";

const queryProductList = gql`
query ProductTypes {
    productTypes {
      productTypeName
      productType
      productTypeDescription
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
  }`

  export default queryProductList;
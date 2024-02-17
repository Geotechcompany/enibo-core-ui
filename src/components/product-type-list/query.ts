import { gql } from "@apollo/client";

const queryProductList = gql`
  query ProductTypes {
    productTypes {
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

export default queryProductList;

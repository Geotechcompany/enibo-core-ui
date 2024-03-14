import { gql } from "@apollo/client";

const queryProductList = gql`
query ProductTypes {
  productTypes {
    productTypeId
    productTypeName
    description
    active
    interestBearing
    fixedInterestRate
    effectiveDate
    fees
    feeTypes {
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

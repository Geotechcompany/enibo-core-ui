
  

import { gql } from "@apollo/client";

const queryFeeTypesList = gql`
query FeeTypes {
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
}
`

  export default queryFeeTypesList;
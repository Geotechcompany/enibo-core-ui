
  

import { gql } from "@apollo/client";

const queryFeeTypesList = gql`
query FeeTypes {
    feeTypes {
      feeTypeName
      description
      transactionTypes
      paymentFrequency
      effectiveDate
      fixedRate
      modifiedBy
      modifiedOn
    }
}`

  export default queryFeeTypesList;
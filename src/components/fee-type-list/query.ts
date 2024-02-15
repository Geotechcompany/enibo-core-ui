import { gql } from "@apollo/client";

const queryFeeTypesList = gql`
query FeeTypes {
    feeTypes {
      feeName
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
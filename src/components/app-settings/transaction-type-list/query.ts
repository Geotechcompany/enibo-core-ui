
  

import { gql } from "@apollo/client";

const queryTransactionTypesList = gql`
query TransactionTypes {
    transactionTypes {
      transactionTypeName
      transactionTypeCode
      description
      currency
      modifiedBy
      modifiedOn
    }
}`

  export default queryTransactionTypesList;
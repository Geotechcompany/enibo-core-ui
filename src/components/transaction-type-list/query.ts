import { gql } from "@apollo/client";

const queryTransactionList = gql`
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

  export default queryTransactionList;
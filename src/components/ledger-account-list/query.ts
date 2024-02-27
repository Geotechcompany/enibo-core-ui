import { gql } from "@apollo/client";

const queryaccountList = gql`
query Accounts {
  accounts {
    id
    name
    account_owner
    account_number
    account_type
    bank
    bank_id
    normal_balance
  }
}`

  export default queryaccountList;
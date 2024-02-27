import { gql } from "@apollo/client";

export const CREATE_LEDGER_ACCOUNT = gql`
  mutation CreateAccount(
    $name: String!
    $accountOwner: String!
    $accountNumber: String!
    $accountType: String!
    $bankId: String!
    $normalBalance: String!
  ) {
    createAccount(
      name: $name
      account_owner: $accountOwner
      account_number: $accountNumber
      account_type: $accountType
      bank_id: $bankId
      normal_balance: $normalBalance
    ) {
      name
      account_owner
      account_number
      account_type
      bank_id
      normal_balance
    }
  }
`;

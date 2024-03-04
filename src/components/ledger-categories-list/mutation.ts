import { gql } from "@apollo/client";

export const CREATE_LEDGER_ACCOUNT_CATEGORIES = gql`
  mutation CreateAccountCategory(
    $ledgerCategory: String!
    $description: String!
    $categoryNumber: String!
    $modifiedBy: String!
  ) {
    createAccountCategory(
      ledgerCategory: $ledgerCategory
      description: $description
      categoryNumber: $categoryNumber
      modifiedBy: $modifiedBy
    ) {
      ledgerCategory
      description
      categoryNumber
      modifiedBy
    }
  }
`;
export const UPDATE_LEDGER_CATEGORIES = gql`
  mutation UpdateAccountCategory(
    $ledgerCategory: String!
    $description: String!
    $categoryNumber: String!
    $modifiedBy: String!
  ) {
    updateAccountCategory(
      ledgerCategory: $ledgerCategory
      description: $description
      categoryNumber: $categoryNumber
      modifiedBy: $modifiedBy
    ) {
      ledgerCategory
      description
      categoryNumber
      modifiedBy
    }
  }
`;

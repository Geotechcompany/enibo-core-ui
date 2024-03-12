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
export const UPDATE_LEDGER_ACCOUNT_CATEGORIES = gql`
  mutation UpdateAccountCategory(
    $updateAccountCategoryId: String!
    $ledgerCategory: String!
    $description: String!
    $categoryNumber: String!
    $modifiedBy: String!
  ) {
    updateAccountCategory(
      id: $updateAccountCategoryId
      ledgerCategory: $ledgerCategory
      description: $description
      categoryNumber: $categoryNumber
      modifiedBy: $modifiedBy
    ) {
      id
      ledgerCategory
      description
      categoryNumber
      modifiedBy
      modifiedOn
    }
  }
`;

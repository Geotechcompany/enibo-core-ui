import { gql } from "@apollo/client";

const queryaccountcategoriesList = gql`
query AccountCategories {
  accountCategories {
    id
    ledgerCategory
    description
    categoryNumber
    modifiedBy
    modifiedOn
  }
}`

  export default queryaccountcategoriesList;
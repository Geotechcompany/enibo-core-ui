import { gql } from "@apollo/client";

const queryaccountcategoriesList = gql`
query AccountCategories {
  accountCategories {
    id
    ledgerCategory
    description
    categoryNumber
  }
}`

  export default queryaccountcategoriesList;
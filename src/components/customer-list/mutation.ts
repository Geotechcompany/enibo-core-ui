import { gql } from "@apollo/client";

export const CREATE_CUSTOMERS = gql`
  mutation CreateCustomer(
    $customerType: String
    $retail: String
    $business: String
    $accountMandates: String
    $modifiedBy: String
    $modifiedOn: String
  ) {
    createCustomer(
      customerType: $customerType
      retail: $retail
      business: $business
      accountMandates: $accountMandates
      modifiedBy: $modifiedBy
      modifiedOn: $modifiedOn
    ) {
      customerType
      retail
      business
      accountMandates
      modifiedBy
      modifiedOn
    }
  }
`;










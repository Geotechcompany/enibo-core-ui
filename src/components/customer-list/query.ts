import { gql } from "@apollo/client";

const queryCustomersList = gql`
query Customers {
    customers {
      customerType
      retail
      business
      accountMandates
      modifiedBy
      modifiedOn
    }
}`;

  export default queryCustomersList;
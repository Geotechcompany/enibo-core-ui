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

export const CREATE_RETAIL = gql`
  mutation CreateRetail(
    $retailType: String!
    $designation: String!
    $firstName: String!
    $middleName: String!
    $lastName: String!
    $individualKyc: String!
    $productTypes: String!
    $accountCurrency: String!
    $riskRating: String!
    $accountMandates: String!
    $modifiedBy: String!
    $modifiedOn: String!
  ) {
    createRetail(
      retailType: $retailType
      designation: $designation
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      individualKYC: $individualKyc
      productTypes: $productTypes
      accountCurrency: $accountCurrency
      riskRating: $riskRating
      accountMandates: $accountMandates
      modifiedBy: $modifiedBy
      modifiedOn: $modifiedOn
    ) {
      retailType
      designation
      firstName
      middleName
      lastName
      individualKYC
      productTypes
      accountCurrency
      riskRating
      accountMandates
      modifiedBy
      modifiedOn
    }
  }
`;

export const CREATE_BUSINESS = gql`
  mutation CreateBusiness(
    $legalEntityName: String!
    $businessKyc: String!
    $productTypes: String!
    $accountCurrency: String!
    $riskRating: String!
    $directorsKyc: String!
    $accountMandates: String!
    $modifiedBy: String!
    $modifiedOn: String!
  ) {
    createBusiness(
      legalEntityName: $legalEntityName
      businessKYC: $businessKyc
      productTypes: $productTypes
      accountCurrency: $accountCurrency
      riskRating: $riskRating
      directorsKYC: $directorsKyc
      accountMandates: $accountMandates
      modifiedBy: $modifiedBy
      modifiedOn: $modifiedOn
    ) {
      legalEntityName
      businessKYC
      productTypes
      accountCurrency
      riskRating
      directorsKYC
      accountMandates
      modifiedBy
      modifiedOn
    }
  }
`;






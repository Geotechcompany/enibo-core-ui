import { gql } from "@apollo/client";

export const CREATE_BRANCH = gql`
  mutation CreateBranch(
    $branchName: String!
    $branchType: String!
    $description: String!
    $phoneNumber: String!
    $branchCode: String!
    $localBankCode: String!
    $country: String!
    $countrySubdivision: String!
    $streetName: String!
    $buildingNumber: String!
    $buildingName: String!
    $postalAddress: String!
    $email: String!
    $isHeadOfficeBranch: Boolean!
    $headOfficeBranch: String!
  ) {
    createBranch(
      branchName: $branchName
      branchType: $branchType
      description: $description
      phoneNumber: $phoneNumber
      branchCode: $branchCode
      localBankCode: $localBankCode
      country: $country
      countrySubdivision: $countrySubdivision
      streetName: $streetName
      buildingNumber: $buildingNumber
      buildingName: $buildingName
      postalAddress: $postalAddress
      email: $email
      isHeadOfficeBranch: $isHeadOfficeBranch
      headOfficeBranch: $headOfficeBranch
    ) {
      branchName
      branchType
      description
      branchCode
      phoneNumber
      SWIFTCode
      localBankCode
      country
      countrySubdivision
      streetName
      buildingNumber
      buildingName
      postalAddress
      AllowedProductTypes
      email
      isHeadOfficeBranch
      headOfficeBranch
    }
  }
`;

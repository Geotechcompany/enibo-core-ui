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


export const DELETE_BRANCH = gql`
mutation DeleteBranch($branchId: String!) {
  deleteBranch(branchId: $branchId) {
    branchId
    branchName
    branchType
    description
    phoneNumber
    branchCode
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

export const UPDATE_BRANCH = gql`
mutation UpdateBranch($branchId: String!, $branchName: String!, $branchType: String!, $description: String!, $phoneNumber: String!, $branchCode: String!, $localBankCode: String!, $country: String!, $countrySubdivision: String!, $streetName: String!, $buildingNumber: String!, $buildingName: String!, $postalAddress: String!, $email: String!, $isHeadOfficeBranch: Boolean!, $headOfficeBranch: String!) {
  updateBranch(branchId: $branchId, branchName: $branchName, branchType: $branchType, description: $description, phoneNumber: $phoneNumber, branchCode: $branchCode, localBankCode: $localBankCode, country: $country, countrySubdivision: $countrySubdivision, streetName: $streetName, buildingNumber: $buildingNumber, buildingName: $buildingName, postalAddress: $postalAddress, email: $email, isHeadOfficeBranch: $isHeadOfficeBranch, headOfficeBranch: $headOfficeBranch) {
    branchId
    branchName
    branchType
    description
    phoneNumber
    branchCode
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
}`
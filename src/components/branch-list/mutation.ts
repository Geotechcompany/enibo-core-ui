import { gql } from "@apollo/client";

const CREATE_BRANCH = gql`
  mutation CreateBranch(
    $branchName: String!
    $branchType: String!
    $description: String!
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
      localBankCode
      branchId
      buildingName
      buildingNumber
      country
      countrySubdivision
      email
      headOfficeBranch
      isHeadOfficeBranch
      postalAddress
      streetName
    }
  }
`;

export default CREATE_BRANCH;

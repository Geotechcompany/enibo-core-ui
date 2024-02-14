import { gql } from "@apollo/client";

const CREATE_BRANCH = gql`
  mutation CreateBranch(
    $branchName: String!
    $description: String!
    $branchCode: String!
    $swiftCode: String!
    $localBankCode: String!
    $country: String!
    $countrySubdivision: String!
    $streetName: String!
    $buildingNumber: String!
    $buildingName: String!
    $postalAddress: String!
    $allowedProductTypes: [String]!
    $email: String!
    $isHeadOfficeBranch: Boolean!
    $headOfficeBranch: String!
    $createdAt: String!
  ) {
    createBranch(
      branchName: $branchName
      description: $description
      branchCode: $branchCode
      SWIFTCode: $swiftCode
      localBankCode: $localBankCode
      country: $country
      countrySubdivision: $countrySubdivision
      streetName: $streetName
      buildingNumber: $buildingNumber
      buildingName: $buildingName
      postalAddress: $postalAddress
      AllowedProductTypes: $allowedProductTypes
      email: $email
      isHeadOfficeBranch: $isHeadOfficeBranch
      headOfficeBranch: $headOfficeBranch
      createdAt: $createdAt
    ) {
      branchName
      description
      branchCode
      localBankCode
      SWIFTCode
      AllowedProductTypes
      branchId
      buildingName
      buildingNumber
      country
      countrySubdivision
      createdAt
      email
      headOfficeBranch
      isHeadOfficeBranch
      postalAddress
      streetName
    }
  }
`;

export default CREATE_BRANCH;

import { gql } from "@apollo/client";

const queryBranchList = gql`
query Branches {
  branches {
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
    createdAt
    updatedAt
  }
}`

  export default queryBranchList;
import { gql } from '@apollo/client';

const QUERY_USERS_LIST = gql`
query Branch($branchId: String!) {
  branch(branchId: $branchId) {
    branchId
    branchName
    description
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
  }
}`
;
export default QUERY_USERS_LIST;

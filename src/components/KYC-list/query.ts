import { gql } from "@apollo/client";

const queryKycList = gql`
query KycType($kycType: String!) {
  kycType(kycType: $kycType) {
    kycTypeId
    kycTypeName
    kycTypeDescription
    kycTypeCode
    modifiedBy
    modifiedOn
    createdAt
    updatedAt
  }
}`

  export default queryKycList;
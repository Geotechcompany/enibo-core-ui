import { gql } from "@apollo/client";

const queryKycTypesList = gql`
query KycTypes {
    kycTypes {
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

  export default queryKycTypesList;
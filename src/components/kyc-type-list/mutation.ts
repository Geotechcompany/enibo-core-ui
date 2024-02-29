
  import { gql } from "@apollo/client";

export const CREATE_KycType = gql`
  mutation CreateKYCType(
    $kycTypeName: String!
    $kycTypeDescription: String!
    $kycTypeCode: String!
    $modifiedBy: String!
    $modifiedOn: String!
  ) {
    createKYCType(
      kycTypeName: $kycTypeName
      kycTypeDescription: $kycTypeDescription
      kycTypeCode: $kycTypeCode
      modifiedBy: $modifiedBy
      modifiedOn: $modifiedOn
    ) {
      kycTypeName
      kycTypeDescription
      kycTypeCode
      modifiedBy
      modifiedOn
    }
  }
`;
export const DELETE_KYCType = gql`
mutation DeleteKYCType($kycTypeId: String!) {
  deleteKYCType(kycTypeId: $kycTypeId) {
    kycTypeName
    kycTypeDescription
    kycTypeCode
    modifiedBy
    modifiedOn
  }
}
`;








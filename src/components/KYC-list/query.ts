import { gql } from "@apollo/client";

const queryKycList = gql`
query IndividualKYCs {
  individualKYCs {
    IndividualKYCId
    kycType
    designation
    firstName
    middleName
    lastName
    phoneNumber
    emailAddress
    postalAddress
    physicalAddress
    country
    taxNumber
    idType
    idNumber
    sex
    nationality
    riskRating
    attachDocumentsField
    signature
    modifiedBy
    modifiedOn
  }
}`

  export default queryKycList;
import { gql } from "@apollo/client";

export const CREATE_KYC_TYPE = gql`
  mutation CreateKYCType(
  $kycTypeCode: String!
  $kycTypeName: String!
  $kycTypeDescription: String!
  $modifiedBy: String!
  $modifiedOn: String!
  ) {
    createKYCType(
      kycTypeCode: $kycTypeCode
      kycTypeName: $kycTypeName
      kycTypeDescription: $kycTypeDescription
      modifiedBy: $modifiedBy
      modifiedOn: $modifiedOn
    ) {
      kycTypeCode
      kycTypeName
      kycTypeDescription
      modifiedBy
      modifiedOn
    }
  }`;

export const CREATE_MANDATE_TYPE = gql`
    mutation CreateMandateType(
    $mandateTypeCode: String!
    $mandateTypeName: String!
    $mandateTypeDescription: String!
    $modifiedBy: String!
    $modifiedOn: String!
    ) {
        createMandateType(
        mandateTypeCode: $mandateTypeCode
        mandateTypeName: $mandateTypeName
        mandateTypeDescription: $mandateTypeDescription
        modifiedBy: $modifiedBy
        modifiedOn: $modifiedOn
        ) {
        mandateTypeCode
        mandateTypeName
        mandateTypeDescription
        modifiedBy
        modifiedOn
        }
    }`;
/**
 * 
 *  
 * 
 * kycType: string;
 designation: string;
    firstName: string;
    middleName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    postalAddress: string;
    physicalAddress: string;
    country: string;
    taxNumber: string;
    idType: string;
    idNumber: string;
    sex: "Male" | "Female" | "Other";
    nationality: string;
    riskRating: string;
    attachDocumentsField: string[];
    signature: string;
 */
  export const CREATE_INDIVIDUAL_KYC = gql`
  mutation CreateIndividualKYC(
    $kycType: String!
    $designation: String!
    $firstName: String!
    $middleName: String!
    $lastName: String!
    $phoneNumber: String!
    $emailAddress: String!
    $postalAddress: String!
    $physicalAddress: String!
    $country: String!
    $taxNumber: String!
    $idType: String!
    $idNumber: String!
    $sex: String!
    $nationality: String!
    $riskRating: String!
    $attachDocumentsField: String!
    $signature: String!
    $modifiedBy: String!
    $modifiedOn: String!
  ) {
    createIndividualKYC(
      kycType: $kycType
      designation: $designation
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      phoneNumber: $phoneNumber
      emailAddress: $emailAddress
      postalAddress: $postalAddress
      physicalAddress: $physicalAddress
      country: $country
      taxNumber: $taxNumber
      idType: $idType
      idNumber: $idNumber
      sex: $sex
      nationality: $nationality
      riskRating: $riskRating
      attachDocumentsField: $attachDocumentsField
      signature: $signature
      modifiedBy: $modifiedBy
      modifiedOn: $modifiedOn
    ) {
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
  }`;

/**
 * 
 *  kycType: "Business";
    legalEntityName: string;
    legalStatus:string;
    dateOfIncorporation: string;
    registrationNumber: string;
    natureOfBusiness: string;
    entityNationality: string;
    entityPINNumber: string;
    entityTaxNumber: string;
    telephoneNumber: string;
    emailAddress: string;
    postalAddress: string;
    physicalAddress: string;
    riskRating: string;
    attachDocumentsField: string[];
    modifiedBy: string;
    modifiedOn: string;
 */

  export const CREATE_BUSINESS_KYC = gql`
  mutation CreateBusinessKYC(
    $kycType: String!
    $legalEntityName: String!
    $legalStatus: String!
    $dateOfIncorporation: String!
    $registrationNumber: String!
    $natureOfBusiness: String!
    $entityNationality: String!
    $entityPINNumber: String!
    $entityTaxNumber: String!
    $telephoneNumber: String!
    $emailAddress: String!
    $postalAddress: String!
    $physicalAddress: String!
    $riskRating: String!
    $attachDocumentsField: String!
    $modifiedBy: String!
    $modifiedOn: String!
  ) {
    createBusinessKYC(
      kycType: $kycType
      legalEntityName: $legalEntityName
      legalStatus: $legalStatus
      dateOfIncorporation: $dateOfIncorporation
      registrationNumber: $registrationNumber
      natureOfBusiness: $natureOfBusiness
      entityNationality: $entityNationality
      entityPINNumber: $entityPINNumber
      entityTaxNumber: $entityTaxNumber
      telephoneNumber: $telephoneNumber
      emailAddress: $emailAddress
      postalAddress: $postalAddress
      physicalAddress: $physicalAddress
      riskRating: $riskRating
      attachDocumentsField: $attachDocumentsField
      modifiedBy: $modifiedBy
      modifiedOn: $modifiedOn
    ) {
      kycType
      legalEntityName
      legalStatus
      dateOfIncorporation
      registrationNumber
      natureOfBusiness
      entityNationality
      entityPINNumber
      entityTaxNumber
      telephoneNumber
      emailAddress
      postalAddress
      physicalAddress
      riskRating
      attachDocumentsField
      modifiedBy
      modifiedOn
    }
  }`;
  export const CREATE_LEDGER_ACCOUNT_CATEGORIES = gql`
mutation CreateAccountCategory($ledgerCategory: String!, $description: String!, $categoryNumber: String!, $modifiedBy: String!) {
  createAccountCategory(ledgerCategory: $ledgerCategory, description: $description, categoryNumber: $categoryNumber, modifiedBy: $modifiedBy) {
    ledgerCategory
    description
    categoryNumber
    modifiedBy
  }
}
`;

 
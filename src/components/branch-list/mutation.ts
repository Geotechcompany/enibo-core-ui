import { gql } from "@apollo/client";

export const CREATE_BRANCH = gql`
mutation CreateBranch($branchName: String, $branchType: String, $description: String, $phoneNumber: String, $branchCode: String, $swiftCode: String, $localBankCode: String, $country: String, $countrySubdivision: String, $streetName: String, $buildingNumber: String, $buildingName: String, $postalAddress: String, $email: String, $allowedProductTypes: [String], $isHeadOfficeBranch: Boolean, $headOfficeBranch: String) {
  createBranch(branchName: $branchName, branchType: $branchType, description: $description, phoneNumber: $phoneNumber, branchCode: $branchCode, SWIFTCode: $swiftCode, localBankCode: $localBankCode, country: $country, countrySubdivision: $countrySubdivision, streetName: $streetName, buildingNumber: $buildingNumber, buildingName: $buildingName, postalAddress: $postalAddress, email: $email, allowedProductTypes: $allowedProductTypes, isHeadOfficeBranch: $isHeadOfficeBranch, headOfficeBranch: $headOfficeBranch) {
    branchId
    branchName
    branchType {
      branchTypeId
      branchTypeName
      description
      modifiedBy
      modifiedOn
      createdAt
      updatedAt
    }
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
    allowedProductTypes {
      productTypeId
      productTypeName
      description
      active
      interestBearing
      fixedInterestRate
      effectiveDate
      fees
      feeTypes {
        feeTypeId
        feeTypeName
        description
        transactionTypes {
          transactionTypeId
          transactionTypeName
          transactionTypeCode
          description
          currency
          modifiedBy
          modifiedOn
        }
        paymentFrequency
        effectiveDate
        fixedRate
        modifiedBy
        modifiedOn
      }
      riskRating
      prefix
      numberSchema
      startingValue
      modifiedBy
      modifiedOn
    }
    email
    isHeadOfficeBranch
    headOfficeBranch
    createdAt
    updatedAt
  }
}
`;

export const DELETE_BRANCH = gql`
mutation DeleteBranch($branchId: String) {
  deleteBranch(branchId: $branchId) {
    branchId
    branchName
    branchType {
      branchTypeId
      branchTypeName
      description
      modifiedBy
      modifiedOn
      createdAt
      updatedAt
    }
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
    allowedProductTypes {
      productTypeId
      productTypeName
      description
      active
      interestBearing
      fixedInterestRate
      effectiveDate
      fees
      feeTypes {
        feeTypeId
        feeTypeName
        description
        transactionTypes {
          transactionTypeId
          transactionTypeName
          transactionTypeCode
          description
          currency
          modifiedBy
          modifiedOn
        }
        paymentFrequency
        effectiveDate
        fixedRate
        modifiedBy
        modifiedOn
      }
      riskRating
      prefix
      numberSchema
      startingValue
      modifiedBy
      modifiedOn
    }
    email
    isHeadOfficeBranch
    headOfficeBranch
    createdAt
    updatedAt
  }
}
`;

export const UPDATE_BRANCH = gql`
mutation UpdateBranch($branchName: String, $branchType: String, $description: String, $branchId: String, $phoneNumber: String, $branchCode: String, $swiftCode: String, $localBankCode: String, $country: String, $countrySubdivision: String, $streetName: String, $buildingNumber: String, $buildingName: String, $postalAddress: String, $email: String, $allowedProductTypes: [String], $isHeadOfficeBranch: Boolean, $headOfficeBranch: String) {
  updateBranch(branchName: $branchName, branchType: $branchType, description: $description, branchId: $branchId, phoneNumber: $phoneNumber, branchCode: $branchCode, SWIFTCode: $swiftCode, localBankCode: $localBankCode, country: $country, countrySubdivision: $countrySubdivision, streetName: $streetName, buildingNumber: $buildingNumber, buildingName: $buildingName, postalAddress: $postalAddress, email: $email, allowedProductTypes: $allowedProductTypes, isHeadOfficeBranch: $isHeadOfficeBranch, headOfficeBranch: $headOfficeBranch) {
    branchId
    branchName
    branchType {
      branchTypeId
      branchTypeName
      description
      modifiedBy
      modifiedOn
      createdAt
      updatedAt
    }
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
    allowedProductTypes {
      productTypeId
      productTypeName
      description
      active
      interestBearing
      fixedInterestRate
      effectiveDate
      fees
      feeTypes {
        feeTypeId
        feeTypeName
        description
        transactionTypes {
          transactionTypeId
          transactionTypeName
          transactionTypeCode
          description
          currency
          modifiedBy
          modifiedOn
        }
        paymentFrequency
        effectiveDate
        fixedRate
        modifiedBy
        modifiedOn
      }
      riskRating
      prefix
      numberSchema
      startingValue
      modifiedBy
      modifiedOn
    }
    email
    isHeadOfficeBranch
    headOfficeBranch
    createdAt
    updatedAt
  }
}
`;

import { gql } from "@apollo/client";

const queryBranchList = gql`
query Branches {
  branches {
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
}`

  export default queryBranchList;
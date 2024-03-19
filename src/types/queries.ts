import { gql } from "@apollo/client";

export const querySettingsList = gql`
  query Settings {
    settings {
      id
      name
      value
      description
      hidden
      modifiedBy
      modifiedOn
      createdAt
      updatedAt
    }
  }
`;
export const querySetting = gql`
  query Setting($settingId: String) {
    setting(id: $settingId) {
      id
      name
      value
      description
      hidden
      modifiedBy
      modifiedOn
      createdAt
      updatedAt
    }
  }
`;

export const queryUserProfiles = gql`
  query Profiles {
    profiles {
      id
      name
      description
      permissions
      modifiedBy
      modifiedOn
    }
  }
`;

export const queryUserProfile = gql`
  query Profile($profileId: String!) {
    profile(id: $profileId) {
      id
      name
      description
      permissions
      modifiedBy
      modifiedOn
    }
  }
`;

export const queryUser = gql`
  query User($userId: String!) {
    user(id: $userId) {
      id
      username
      firstName
      middleName
      lastName
      email
      password
      confirmPassword
      phoneNumber
      employeeNumber
      branch
      profile {
        id
        name
        description
        permissions
        modifiedBy
        modifiedOn
      }
      documentAttachment
      modifiedBy
      modifiedOn
    }
  }
`;

export const ledgerAccountsQuery = gql`
query LedgerAccounts {
  ledgerAccounts {
    id
    account_number
    export_account_number
    description
    customer_account_number
    ledger_account_number
    branch_id
    chart_string
    accountCategoryId
    account_category {
      id
      ledgerCategory
      description
      categoryNumber
      modifiedBy
      modifiedOn
    }
  }
}
`;

export const ledgerAccountQuery = gql`
  query LedgerAccount($accountNumber: String) {
    ledgerAccount(account_number: $accountNumber) {
      id
      account_number
      export_account_number
      description
      customer_account_number
      ledger_account_number
      branch_id
      chart_string
      accountCategoryId
      account_category {
        id
        ledgerCategory
        description
        categoryNumber
        modifiedBy
        modifiedOn
      }
    }
  }
`;

export const queryLedgerRules = gql`
  query LedgerRules {
    ledgerRules {
      id
      name
      description
      transactionType
      contains
      doesNotContain
      from
      to
      debitAccount
      creditAccount
      modifiedBy
    }
  }
`;

export const queryLedgerRule = gql`
  query LedgerRule($ledgerRuleId: String) {
    ledgerRule(id: $ledgerRuleId) {
      id
      name
      description
      transactionType
      contains
      doesNotContain
      from
      to
      debitAccount
      creditAccount
      modifiedBy
    }
  }
`;

export const queryBusinessKYCs = gql`
query BusinessKYCs {
  businessKYCs {
    businessKYCId
    kycType
    legalEntityName
    legalStatus
    dateOfIncorporation
    registrationNumber
    natureOfBusiness
    entityNationality
    entityPinNumber
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
}
`;

export const queryBusinessKYC = gql`
query BusinessKYC($businessKycId: String!) {
  businessKYC(businessKYCId: $businessKycId) {
    businessKYCId
    kycType
    legalEntityName
    legalStatus
    dateOfIncorporation
    registrationNumber
    natureOfBusiness
    entityNationality
    entityPinNumber
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
}
`
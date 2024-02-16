export type CustomerType = "Retail" | "Business"

enum RetailType {
    Personal,
    Joint
}

type AccountMandate = {
    signatory: string; //reference to Signatory
    mandateType: string;
    signingRules: string;
}


type Retail = {
    retailType: RetailType;
    designation: string;
    firstName: string;
    middleName: string;
    lastName: string;
    individualKYC: string; //reference to IndividualKYC
    productTypes: string[]; //reference to ProductType
    accountCurrency: string;
    riskRating: string;
    accountMandates: AccountMandate[]; //reference to AccountMandate
}

type Business = {
    legalEntityName: string;
    businessKYC: string; //reference to BusinessKYC
    productTypes: string[]; //reference to ProductType
    accountCurrency: string;
    riskRating: string;
    directors: string[]; //reference to Director
    directorsKYC: string[]; //reference to DirectorKYC
    accountMandates: AccountMandate[]; //reference to AccountMandate
}

export type Customer = {
    customerType: CustomerType;
    retail?: Retail;
    business?: Business;
    signingMandateRules: {
        signingRules: string;
        minimumPaymentAmount: number;
        maximumPaymentAmount: number;
    };
}

export type ProductType = {
    productTypeName: string;
    productType: string;
    description: string;
    active: boolean;
    interestBearing: boolean;
    fixedInterestRate: number;
    effectiveDate: string;
    fees: boolean;
    feeTypes: string[]; 
    riskRating: string;
    prefix: string;
    numberSchema: string;
    startingValue: number;
    modifiedBy: string;
    modifiedOn: string;
};

export type LedgerAccount = {
    ledgerAccountNumber: string;
    exportLedgerAccountNumber: string;
    description: string;
    ledgerAccountType: 'Customer' | 'Internal';
    customerAccountNumber: string;
    branchCode: string;
    ledgerAccountCategory: string;
    chartString: string;
};

export type TransactionType = {
    transactionTypeName: string;
    transactionTypeCode: string;
    transactionTypeDescription: string;
    currency: string;
};

export type Transaction = {
    id: string;
    status: string;
    transactionType: string;
    normalBalance: string;
    amount: number;
    accountId: string;
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
}

export type Entry = {
    accountId: string;
    amount: string;
    createdAt: string
    description: string;
    direction: string
    discardedAt: string;
    id: string;
    status: string;
    transactionId: string;
};

export type FeeType = {
    feeCode: string;
    feeName: string;
    description: string;
    transactionType: string;
    paymentFrequency: string;
    effectiveDate: string;
    fixedRate: number;
};

export type LedgerRule = {
    priority: string;
    ruleName: string;
    description: string;
    transactionType: string;
    transactionsDescriptionContains: string;
    transactionDescriptionDoesNotContain: string;
    from: string;
    to: string;
    debitLedgerAccount: string;
    creditLedgerAccount: string;
    modifiedBy: string;
    modifiedOn: string;
}

export type LedgerCategory = {
    ledgerCategory: string;
    ledgerCategoryDescription: string;
    categoryNumber: string;
    modifiedBy: string;
    modifiedOn: string;
};

export type KYCType = {
    kycType: "Individual" | "Business";
    kycTypeName: string;
    kycTypeDescription: string;
    kycTypeCode: string;
    modifiedBy: string;
    modifiedOn: string;
};
export type MandateType = {
    mandateTypeName: string;
    mandateTypeDescription: string;
    mandateTypeCode: string;
    modifiedBy: string;
    modifiedOn: string;
};

type KYCIndividual = {
    kycType: "Individual";
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
    modifiedBy: string;
    modifiedOn: string;
  };
  
  type KYCBusiness = {
    kycType: "Business";
    legalEntityName: string;
    legalStatus:
      | "Sole Proprietor"
      | "Partnership"
      | "Limited Company"
      | "Government Entity"
      | "Society/Association/Club/Trust"
      | "NGO/International Charity"
      | "Other (specify)";
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
  };

 
  
export type KYC = {
    KYCType: "Individual" | "Business";
    individual?: KYCIndividual;
    business?: KYCBusiness;
};

export type ApprovalRule = {
    module: string;
    subModule: string;
    status: string;
    approvalRule: string;
    requestedBy: string;
    requestedOn: string; // You might want to use a Date type here if the date is involved
    note: string;
    pendingApprovers: string[];
    approvedBy: string | null; // Assuming it could be null if not approved yet
    rejectionReason: string | null; // Assuming it could be null if not rejected
  }

  export interface BranchData {
    name: string;
    activeCustomers: number;
    transactionVolume: ChartData;
    totalBalancesByRisk: {
      High: number;
      Medium: number;
      Low: number;
    };
    activeAccountsByProductType: {
      [key: string]: number;
    };
  }
  
  export interface ChartData {
    labels: string[];
    values: number[];
  }

  export interface UserDetailsType{
    id: number;
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    employeeNumber: string;
    branch: string;
    profile: string;
    documentAttachment: string;
    modifiedOn: string;
    modifiedBy: string;
  }



  
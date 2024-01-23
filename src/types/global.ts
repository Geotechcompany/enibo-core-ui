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
}

export type ProductType = {
    productTypeCode: string;
    productType: string;
    productTypeDescription: string;
    activeFlag: boolean;
    interestBearing: boolean;
    fixedInterestRate: number | null; // It can be a number or null if not applicable
    effectiveDate: string;
    fees: boolean;
    feeTypes: string[]; // Assuming it's an array of strings, modify as needed
    riskRating: string;
    prefix: string;
    numberSchema: string;
    accountNumberStartingValue: number;
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
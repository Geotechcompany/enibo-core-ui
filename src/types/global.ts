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
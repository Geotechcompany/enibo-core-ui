import {
  ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface AppState {
  customerType: string;
  customer: string;
  retail: string;
  individuals: {
    kycId: string | undefined;
    createdBy: string | undefined;
    kycType: string | undefined;
    status: string | undefined;
  }[];
  businesses: {
    kycId: string | undefined;
    createdBy: string | undefined;
    kycType: string | undefined;
    status: string | undefined;
  }[];
  user:{
    id: string;
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    employeeNumber: string;
    branch: string;
    profile: string;
    documentAttachment: string;
    modifiedBy: string;
    modifiedOn: string;
  }
  product: {
    productTypes: string;
    accountCurrency: string;
    riskRating: string;
  }
  mandates: {
    mandateId: string;
    signatory: string;
    mandateType: string;
    category: string;
    modifiedBy: string;
    modifiedOn: string;
}[]
signingRules: {
  signingRule: string;
  signingMandateType: string;
  minimumPaymentAmount: string;
  maximumPaymentAmount: string;
  maximumDailyLimit: string;
}[]
}

interface AppContextType {
  appState: AppState;
  setAppState: Dispatch<SetStateAction<AppState>>;
}

export const AppStateContext = createContext<AppContextType | undefined>(
  undefined
);

type AppProviderProps = {
  children?: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  // Use useState with the initial state
  const [appState, setAppState] = useState<AppState>({
    // Initialize your state properties here
    customerType: "",
    retail: "",
    customer: "",
    individuals: [],
    businesses: [],
    user: {
      id: "",
      username: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      employeeNumber: "",
      branch: "",
      profile: "",
      documentAttachment: "",
      modifiedBy: "",
      modifiedOn: "",
    },
    product: {
      productTypes: "",
      accountCurrency: "",
      riskRating: "",
    },
    mandates: [],
    signingRules: [],
  });

  const value: AppContextType = {
    appState,
    setAppState,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used within an AppProvider");
  }

  return context;
};

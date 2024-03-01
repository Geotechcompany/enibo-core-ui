
import {
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";


// Define the shape of the ledger state
interface LedgerState {
    ledgerCategory: string;
    description: string;
    categoryNumber: string;
}

// Define the props for the LedgerProvider component
interface LedgerProviderProps {
  children?: ReactNode;
}

// Define the shape of the ledger context
interface LedgerContextType {
  state: LedgerState | undefined;
  setState: Dispatch<SetStateAction<LedgerState | undefined>>;
}

// Create the ledger context
export const LedgerStateContext = createContext<LedgerContextType | undefined>(
  undefined
);

// Create the LedgerProvider component
 const LedgerProvider: FunctionComponent<LedgerProviderProps> = ({
  children,
}: LedgerProviderProps) => {
  // Define state and setState using useState hook
  const [state, setState] = useState<LedgerState | undefined>(undefined);

  // Create the value object to be passed to the context provider
  const value: LedgerContextType = {
    state,
    setState,
  };

  // Return the context provider with the value
  return (
    <LedgerStateContext.Provider value={value}>
      {children}
    </LedgerStateContext.Provider>
  );
};

export default LedgerProvider;


// Export the LedgerProvider component
 


// Custom hook to consume the ledger context
export const useLedgerState = () => {
  // Use the useContext hook to access the ledger context
  const context = useContext(LedgerStateContext);

  // Throw an error if the context is undefined
  if (!context) {
    throw new Error("useLedgerState must be used within a LedgerProvider");
  }

  return context;
};

  
  
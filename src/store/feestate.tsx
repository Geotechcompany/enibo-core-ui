import {
    Dispatch,
    FunctionComponent,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  
  interface FeeState {
    mode?: "ADD" | "COPY" | "EDIT";
    feeTypeId: string;
    feeTypeName: string;
    paymentFrequency: string;
    transactionTypes: string[];
    effectiveDate: string;
    fixedRate: number;
    description: string;
  }
  
  interface FeeProviderProps {
    children?: ReactNode;
  }
  
  interface FeeContextType {
    state: FeeState | undefined;
    setState: Dispatch<SetStateAction<FeeState | undefined>>;
  }
  
  export const FeeStateContext = createContext<FeeContextType | undefined>(undefined);
  
  const FeeProvider: FunctionComponent<FeeProviderProps> = ({ children }: FeeProviderProps) => {
    const [state, setState] = useState<FeeState | undefined>(() => {
      const storedState = localStorage.getItem("feeState");
      // Check if the retrieved value is "undefined"
      return storedState && storedState !== "undefined" ? JSON.parse(storedState) : undefined;
    });
  
    useEffect(() => {
      localStorage.setItem("feeState", JSON.stringify(state));
    }, [state]);
  
    const value: FeeContextType = {
      state,
      setState,
    };
  
    return (
      <FeeStateContext.Provider value={value}>
        {children}
      </FeeStateContext.Provider>
    );
  };
  
  export default FeeProvider;
  
  export const useFeeState = () => {
    const context = useContext(FeeStateContext);
  
    if (!context) {
      throw new Error("useFeeState must be used within a FeeProvider");
    }
  
    return context;
  };
  
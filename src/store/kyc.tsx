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
  
  interface KycState {
    mode?: "ADD" | "COPY" | "EDIT";
    kycTypeId: string;
    kycTypeCode: string;
    kycTypeName: string;
    kycTypeDescription: string;
  }
  
  interface KycProviderProps {
    children?: ReactNode;
  }
  
  interface KycContextType {
    state: KycState | undefined;
    setState: Dispatch<SetStateAction<KycState | undefined>>;
  }
  
  export const KycStateContext = createContext<KycContextType | undefined>(undefined);
  
  const KycProvider: FunctionComponent<KycProviderProps> = ({ children }: KycProviderProps) => {
    const [state, setState] = useState<KycState | undefined>(() => {
      const storedState = localStorage.getItem("kycState");
      return storedState ? JSON.parse(storedState) : undefined;
    });
  
    useEffect(() => {
      localStorage.setItem("kycState", JSON.stringify(state));
    }, [state]);
  
    const value: KycContextType = {
      state,
      setState,
    };
  
    return (
      <KycStateContext.Provider value={value}>
        {children}
      </KycStateContext.Provider>
    );
  };
  
  export default KycProvider;
  
  export const useKycState = () => {
    const context = useContext(KycStateContext);
  
    if (!context) {
      throw new Error("useKycState must be used within a KycProvider");
    }
  
    return context;
  };
  
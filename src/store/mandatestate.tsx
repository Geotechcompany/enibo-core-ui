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
  
  interface MandateState {
    mode?: "ADD" | "COPY" | "EDIT";
    mandateTypeCode: string;
    mandateTypeName: string;
    mandateTypeDescription: string;
  }
  
  interface MandateProviderProps {
    children?: ReactNode;
  }
  
  interface MandateContextType {
    state: MandateState | undefined;
    setState: Dispatch<SetStateAction<MandateState | undefined>>;
  }
  
  export const MandateStateContext = createContext<MandateContextType | undefined>(undefined);
  
  const MandateProvider: FunctionComponent<MandateProviderProps> = ({ children }: MandateProviderProps) => {
    const [state, setState] = useState<MandateState | undefined>(() => {
      const storedState = localStorage.getItem("mandateState");
      // Check if the retrieved value is "undefined"
      return storedState !== null && storedState !== "undefined" ? JSON.parse(storedState) : undefined;
    });
  
    useEffect(() => {
      localStorage.setItem("mandateState", JSON.stringify(state));
    }, [state]);
  
    const value: MandateContextType = {
      state,
      setState,
    };
  
    return (
      <MandateStateContext.Provider value={value}>
        {children}
      </MandateStateContext.Provider>
    );
  };
  
  export default MandateProvider;
  
  export const useMandateState = () => {
    const context = useContext(MandateStateContext);
  
    if (!context) {
      throw new Error("useMandateState must be used within a MandateProvider");
    }
  
    return context;
  };
  
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
  
  interface BranchState {
    mode?: "ADD" | "COPY" | "EDIT"; 
    branchTypeName: string;
    description: string;
  }
  
  interface BranchProviderProps {
    children?: ReactNode;
  }
  
  interface BranchContextType {
    state: BranchState | undefined;
    setState: Dispatch<SetStateAction<BranchState | undefined>>;
  }
   
  export const BranchStateContext = createContext<BranchContextType | undefined>(undefined);
  
  const BranchTypeProvider: FunctionComponent<BranchProviderProps> = ({ children }: BranchProviderProps) => {
    const [state, setState] = useState<BranchState | undefined>(() => {
      const storedState = localStorage.getItem("branchTypeState");
      // Check if the retrieved value is "undefined"
      return storedState && storedState !== "undefined" ? JSON.parse(storedState) : undefined;
    });
  
    useEffect(() => {
      localStorage.setItem("branchTypeState", JSON.stringify(state));
    }, [state]);
  
    const value: BranchContextType = {
      state,
      setState,
    };
  
    return (
      <BranchStateContext.Provider value={value}>
        {children}
      </BranchStateContext.Provider>
    );
  };
   
  export default BranchTypeProvider;
  
  export const useBranchTypeState = () => {
    const context = useContext(BranchStateContext);
  
    if (!context) {
      throw new Error("useBranchTypeState must be used within a BranchTypeProvider");
    }
  
    return context;
  };
  
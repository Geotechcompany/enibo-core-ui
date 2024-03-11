import { Dispatch, FunctionComponent, ReactNode, SetStateAction, createContext, useContext, useState } from "react";


interface FeeState {
    mode?: "ADD" | "COPY" | "EDIT"; 
  
    feeTypeId: string,
    feeTypeName: string;
    paymentFrequency: string;
    transactionTypes: string[];
    effectiveDate: string;
    fixedRate: number;
    description: string;
}

interface FeeProviderProps {
    children?: ReactNode
}

interface FeeContextType {
    state: FeeState | undefined;
    setState: Dispatch<SetStateAction<FeeState | undefined>>;
}
 
export const FeeStateContext = createContext<FeeContextType | undefined>(undefined)

const FeeProvider: FunctionComponent<FeeProviderProps> = ({children}: FeeProviderProps) => {
    const [state, setState] = useState<FeeState | undefined >(undefined)
    const value: FeeContextType = {
        state,
        setState,
    }
    return (  
        <FeeStateContext.Provider value={value}>
        {children}
        </FeeStateContext.Provider>
    );
}
 
export default FeeProvider;

export const useFeeState = () => {
    const context = useContext(FeeStateContext)

    if(!context) {
        throw new Error("")
    }

    return context
}
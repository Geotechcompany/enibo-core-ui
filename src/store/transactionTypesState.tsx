import { Dispatch, FunctionComponent, ReactNode, SetStateAction, createContext, useContext, useState } from "react";


interface TransactionState {
    mode?: "ADD" | "COPY" | "EDIT"; 
    transactionTypeId: string;
    transactionTypeName: string;
    transactionTypeCode: string;
    description: string;
    currency: string;
    modifiedBy: string;
    modifiedOn:  string;
}

interface TransactionProviderProps {
    children?: ReactNode
}

interface TransactionContextType {
    state: TransactionState | undefined;
    setState: Dispatch<SetStateAction<TransactionState | undefined>>;
}
 
export const TransactionStateContext = createContext<TransactionContextType | undefined>(undefined)

const TransactionTypeProvider: FunctionComponent<TransactionProviderProps> = ({children}: TransactionProviderProps) => {
    const [state, setState] = useState<TransactionState | undefined >(undefined)
    const value: TransactionContextType = {
        state,
        setState,
    }
    return (  
        <TransactionStateContext.Provider value={value}>
        {children}
        </TransactionStateContext.Provider>
    );
}
 
export default TransactionTypeProvider;

export const useTransactionTypeState = () => {
    const context = useContext(TransactionStateContext)

    if(!context) {
        throw new Error("")
    }

    return context
}
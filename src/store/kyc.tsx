import { Dispatch, FunctionComponent, ReactNode, SetStateAction, createContext, useContext, useState } from "react";


interface KycState {
    mode?: "ADD" | "COPY" | "EDIT"; 
    kycTypeName: string;
    KYCTypeDescription: string;
}

interface KycProviderProps {
    children?: ReactNode
}

interface KycContextType {
    state: KycState | undefined;
    setState: Dispatch<SetStateAction<KycState | undefined>>;
}
 
export const KycStateContext = createContext<KycContextType | undefined>(undefined)

const KycProvider: FunctionComponent<KycProviderProps> = ({children}: KycProviderProps) => {
    const [state, setState] = useState<KycState | undefined >(undefined)
    const value: KycContextType = {
        state,
        setState,
    }
    return (  
        <KycStateContext.Provider value={value}>
        {children}
        </KycStateContext.Provider>
    );
}
 
export default KycProvider;

export const useKycState = () => {
    const context = useContext(KycStateContext)

    if(!context) {
        throw new Error("")
    }

    return context
}
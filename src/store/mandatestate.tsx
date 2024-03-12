import { Dispatch, FunctionComponent, ReactNode, SetStateAction, createContext, useContext, useState } from "react";


interface MandateState {
    mode?: "ADD" | "COPY" | "EDIT"; 
    // mandateTypeId: string;
    mandateTypeCode: string;
    mandateTypeName: string;
    mandateTypeDescription: string;
}

interface MandateProviderProps {
    children?: ReactNode
}

interface MandateContextType {
    state: MandateState | undefined;
    setState: Dispatch<SetStateAction<MandateState | undefined>>;
}
 
export const MandateStateContext = createContext<MandateContextType | undefined>(undefined)

const MandateProvider: FunctionComponent<MandateProviderProps> = ({children}: MandateProviderProps) => {
    const [state, setState] = useState<MandateState | undefined >(undefined)
    const value: MandateContextType = {
        state,
        setState,
    }
    return (  
        <MandateStateContext.Provider value={value}>
        {children}
        </MandateStateContext.Provider>
    );
}
 
export default MandateProvider;

export const useMandateState = () => {
    const context = useContext(MandateStateContext)

    if(!context) {
        throw new Error("")
    }

    return context
}
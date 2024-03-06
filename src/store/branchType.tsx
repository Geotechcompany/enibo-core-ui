import { Dispatch, FunctionComponent, ReactNode, SetStateAction, createContext, useContext, useState } from "react";


interface BranchState {
    mode?: "ADD" | "COPY" | "EDIT"; 
    branchTypeName: string;
    description: string;
}

interface BranchProviderProps {
    children?: ReactNode
}

interface BranchContextType {
    state: BranchState | undefined;
    setState: Dispatch<SetStateAction<BranchState | undefined>>;
}
 
export const BranchStateContext = createContext<BranchContextType | undefined>(undefined)

const BranchTypeProvider: FunctionComponent<BranchProviderProps> = ({children}: BranchProviderProps) => {
    const [state, setState] = useState<BranchState | undefined >(undefined)
    const value: BranchContextType = {
        state,
        setState,
    }
    return (  
        <BranchStateContext.Provider value={value}>
        {children}
        </BranchStateContext.Provider>
    );
}
 
export default BranchTypeProvider;

export const useBranchTypeState = () => {
    const context = useContext(BranchStateContext)

    if(!context) {
        throw new Error("")
    }

    return context
}
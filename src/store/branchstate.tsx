import { Dispatch, FunctionComponent, ReactNode, SetStateAction, createContext, useContext, useState } from "react";


interface BranchState {
    mode?: "ADD" | "COPY" | "EDIT"; 
    branchId?: string;
    branchName: string;
    branchType: string;
    description: string;
    branchCode: string;
    SWIFTCode: string;
    localBankCode: string;
    country: string;
    countrySubdivision: string;
    streetName: string;
    buildingNumber: string;
    buildingName: string;
    postalAddress: string;
    email: string;
    phoneNumber: string;
    isHeadOfficeBranch: boolean;
    headOfficeBranch?:string;
}

interface BranchProviderProps {
    children?: ReactNode
}

interface BranchContextType {
    state: BranchState | undefined;
    setState: Dispatch<SetStateAction<BranchState | undefined>>;
}
 
export const BranchStateContext = createContext<BranchContextType | undefined>(undefined)

const BranchProvider: FunctionComponent<BranchProviderProps> = ({children}: BranchProviderProps) => {
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
 
export default BranchProvider;

export const useBranchState = () => {
    const context = useContext(BranchStateContext)

    if(!context) {
        throw new Error("")
    }

    return context
}
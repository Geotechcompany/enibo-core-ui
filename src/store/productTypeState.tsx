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
  
  interface ProductState {
    mode?: "ADD" | "COPY" | "EDIT";
    productTypeId?: string;
    productTypeName: string;
    description: string;
    active: boolean;
    interestBearing: boolean;
    fixedInterestRate: number;
    effectiveDate: string;
    fees: boolean;
    feeTypes: string[];
    riskRating: string;
    prefix: string;
    numberSchema: string;
    startingValue: number;
  }
  
  interface ProductProviderProps {
    children?: ReactNode;
  }
  
  interface ProductContextType {
    state: ProductState | undefined;
    setState: Dispatch<SetStateAction<ProductState | undefined>>;
  }
  
  export const ProductStateContext = createContext<ProductContextType | undefined>(undefined);
  
  const ProductTypeProvider: FunctionComponent<ProductProviderProps> = ({ children }: ProductProviderProps) => {
    const [state, setState] = useState<ProductState | undefined>(() => {
      const storedState = localStorage.getItem("productState");
      return storedState ? JSON.parse(storedState) : undefined;
    });
  
    useEffect(() => {
      localStorage.setItem("productState", JSON.stringify(state));
    }, [state]);
  
    const value: ProductContextType = {
      state,
      setState,
    };
  
    return (
      <ProductStateContext.Provider value={value}>
        {children}
      </ProductStateContext.Provider>
    );
  };
  
  export default ProductTypeProvider;
  
  export const useProductTypeState = () => {
    const context = useContext(ProductStateContext);
  
    if (!context) {
      throw new Error("useProductTypeState must be used within a ProductTypeProvider");
    }
  
    return context;
  };
  
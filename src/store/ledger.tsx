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

interface LedgerState {
  mode?: "ADD" | "COPY" | "EDIT";
  ledgerCategory: string;
  categoryNumber: string;
  description: string;
}

interface LedgerProviderProps {
  children?: ReactNode;
}

interface LedgerContextType {
  state: LedgerState | undefined;
  setState: Dispatch<SetStateAction<LedgerState | undefined>>;
}

export const LedgerStateContext = createContext<LedgerContextType | undefined>(
  undefined
);

const LedgerProvider: FunctionComponent<LedgerProviderProps> = ({
  children,
}: LedgerProviderProps) => {
  const [state, setState] = useState<LedgerState | undefined>(() => {
    const storedState = localStorage.getItem("ledgerState");
    return storedState !== null && storedState !== "undefined" ? JSON.parse(storedState) : undefined;
  });

  useEffect(() => {
    localStorage.setItem("ledgerState", JSON.stringify(state));
  }, [state]);

  const value: LedgerContextType = {
    state,
    setState,
  };

  return (
    <LedgerStateContext.Provider value={value}>
      {children}
    </LedgerStateContext.Provider>
  );
};

export default LedgerProvider;

export const useLedgerState = () => {
  const context = useContext(LedgerStateContext);
  if (!context) {
    throw new Error("useLedgerState must be used within a LedgerProvider");
  }
  return context;
};

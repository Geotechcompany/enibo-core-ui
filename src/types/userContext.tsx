import React, { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
}

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

// Custom hook to consume the user context
export const useUser = () => useContext(UserContext);

// User Provider component to wrap the application
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
import { View, Text } from 'react-native'
import React, {  ReactNode, createContext, useContext, useState } from 'react'
import { User } from '../types';

type AuthContextType = {
    user: User | null | undefined
    updateUser: (userInfo: User | null) => void;
  };

  type AuthProviderProps = {
    children: ReactNode;
  };
  

const AuthContext = createContext<AuthContextType  | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    
    const [user, setUser] = useState<User | null>();

    const updateUser = (userInfo: User | null | undefined) => {
        setUser(userInfo);
    };

    const contextValue: AuthContextType = {
        user,
        updateUser,
    };

    return (
        <AuthContext.Provider value={contextValue}>
          {children}
        </AuthContext.Provider>
    )
}

export default function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
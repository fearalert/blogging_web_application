import { useContext } from "react";
import { createContext } from 'react';
import { User, LoginResponse } from '../interfaces/interfaces';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (response: LoginResponse) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
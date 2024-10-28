import { useState, ReactNode } from 'react';
import { User, LoginResponse } from '../interfaces/interfaces';
import { AuthContext } from './useAuth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (response: LoginResponse) => {
        setUser(response.user);
        setToken(response.token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

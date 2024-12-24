import { useState, ReactNode, useEffect } from 'react';
import { User, LoginResponse } from '../interfaces/interfaces';
import { AuthContext } from '../hooks/useAuth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);  // Add loading state

    useEffect(() => {
        const initializeAuth = () => {
            try {
                const storedUser = localStorage.getItem('user');
                const storedToken = localStorage.getItem('token');
                
                if (storedUser && storedToken) {
                    setUser(JSON.parse(storedUser));
                    setToken(storedToken);
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                // Clear potentially corrupted data
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = (response: LoginResponse) => {
        try {
            setUser(response.user);
            setToken(response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const logout = () => {
        const isConfirmed = window.confirm("Are you sure you want to log out?");
        if (isConfirmed) {
            setUser(null);
            setToken(null);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    };

    const isAuthenticated = Boolean(token);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            token, 
            login, 
            logout, 
            isAuthenticated 
        }}>
            {children}
        </AuthContext.Provider>
    );
};
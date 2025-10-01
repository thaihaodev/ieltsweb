// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    id: string;
    username: string;
    avatarUrl: string; 
    gmail: string; 
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // 1. KHÔI PHỤC TỪ SESSION STORAGE
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const isAuthenticated = !!user;

    const login = (userData: User) => {
        setUser(userData);
        // 2. LƯU VÀO SESSION STORAGE
        sessionStorage.setItem('user', JSON.stringify(userData)); 
    };

    const logout = () => {
        setUser(null);
        // 3. XÓA KHỎI SESSION STORAGE
        sessionStorage.removeItem('user'); 
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
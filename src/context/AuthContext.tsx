// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    id: string;
    username: string;
    avatarUrl: string; // Thêm trường avatar
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void; // Trạng thái loading toàn cục
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // Khôi phục trạng thái người dùng từ Local Storage khi khởi tạo
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = !!user;

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
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
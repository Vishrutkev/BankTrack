import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { checkAuth } from '../fetch/auth';

interface Props {
    children: ReactNode;
}

const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: Props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const isAuthenticated = async () => {
            try {
                console.log("here");
                checkAuth(sessionStorage.getItem('token')!)
                    .then((res: any) => {
                        if (!res.ok) {
                            setIsAuthenticated(false);
                        } else {
                            setIsAuthenticated(true);
                        }
                    })
                // const response = await fetch('/api/check-auth', );
                // if (response.ok) {
                //     setIsAuthenticated(true);
                // } else {
                //     setIsAuthenticated(false);
                // }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        isAuthenticated();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;



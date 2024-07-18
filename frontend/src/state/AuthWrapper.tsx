import React, { useState, useEffect, ReactNode } from 'react';
import { checkAuth } from '../fetch/auth';
import { Navigate } from 'react-router-dom';
import Loading from '../component/Loading';

interface Props {
    children: ReactNode;
}

const AuthWrapper = ({ children }: Props) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setLoading(true);
            checkAuth(token)
                .then(async (res: any) => {
                    if (!res.ok) {
                        const errorData = await res.json();
                        throw new Error(errorData || 'Unauthorized');
                    }
                    setIsAuthenticated(true);
                })
                .catch((error) => {
                    console.error(error.message);
                    setError(error.message);
                    setIsAuthenticated(false);
                });
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false);
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/signIn" />;
    }

    return (
        <>
            {loading && <Loading />}
            {children}
        </>
    );
}

export default AuthWrapper;

import React, { useState, useEffect, ReactNode } from 'react';
import { checkAuth } from '../fetch/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from '../component/Loading';
import useAutoLogout from '../hooks/useAutoLogout';
import Notification from '../component/Notification';

interface Props {
    children: ReactNode;
}

const AuthWrapper = ({ children }: Props) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('link_token');
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('linkSuccess');
        navigate("/signIn");
    };

    const timeOut = 15 * 60 * 1000;

    const { open, remainingTime, setOpen } = useAutoLogout(timeOut, logout); // Auto logout after 15 minutes of user inactivity

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
            <Notification
                open={open}
                message={`Are you there? Your session will timeout in ${Math.ceil(remainingTime / 1000 / 60)} minutes`}
                severity={"error"}
                onClose={() => setOpen(false)}
            />
        </>
    );
}

export default AuthWrapper;

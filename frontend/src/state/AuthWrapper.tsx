import React, { useState, useEffect, ReactNode } from 'react';
import { checkAuth } from '../fetch/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import useAutoLogout from '../hooks/useAutoLogout';
import Notification from '../components/Notification';
import useAuth from '../hooks/useAuth';

interface Props {
    children: ReactNode;
}

const AuthWrapper = ({ children }: Props) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user, dispatch } = useAuth();

    const logout = () => {
        sessionStorage.removeItem('link_token');
        sessionStorage.removeItem('linkSuccess');
        dispatch({ type: 'LOGOUT' });
        navigate("/signIn");
    };

    const timeOut = 15 * 60 * 1000;

    const { open, remainingTime, setOpen } = useAutoLogout(timeOut, logout); // Auto logout after 15 minutes of user inactivity


    useEffect(() => {
        console.log(user);
        if (!user.isAuthenticated) {
            navigate('/signIn');
        }
    }, [user]);

    // useEffect(() => {
    //     console.log(user);
    //     const token = user.token;
    //     //const token = JSON.parse(localStorage.getItem('user')!).token;
    //     console.log("token = " + token);
    //     if (token) {
    //         setLoading(true);
    //         checkAuth(token)
    //             .then(async (res: any) => {
    //                 if (!res.ok) {
    //                     const errorData = await res.json();
    //                     throw new Error(errorData || 'Unauthorized');
    //                 }
    //                 setIsAuthenticated(true);
    //             })
    //             .catch((error) => {
    //                 console.error(error.message);
    //                 setIsAuthenticated(false);
    //             });
    //     } else {
    //         setIsAuthenticated(false);
    //     }
    //     setLoading(false);
    // }, []);

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

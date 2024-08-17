import React, { useEffect } from 'react';
import ConnectToBank from '../containers/plaid/ConnectToBank';
import useAuth from '../hooks/useAuth';


const Overview = () => {
    const { user } = useAuth();

    return (
        <>
            {user && <>
                <h2>{`Welcome Back, ${user.userName}`}</h2>
                <ConnectToBank />
            </>}
        </>
    );
};

export default Overview;

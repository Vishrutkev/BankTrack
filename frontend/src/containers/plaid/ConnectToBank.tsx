import { useContext, useState } from 'react'
import GenerateLinkToken from './GenerateLinkToken'
import LaunchLink from './LaunchLink'
import PlaidLinkContext from '../../state/plaid/plaidLinkContext'
import RenderTransactions from './GenerateTransactions'

const ConnectToBank = () => {
    const { linkSuccess, linkToken } = useContext(PlaidLinkContext)
    const [showComponent, setShowComponent] = useState<Boolean>(false);

    const handleClick = () => {
        setShowComponent(true);
    }

    return (
        <div>
            {!(sessionStorage.getItem('linkSuccess') || linkSuccess) && !linkToken && <button onClick={handleClick}>Connect My Bank</button>}
            {showComponent && (
                <>
                    <GenerateLinkToken />
                    <LaunchLink />
                </>
            )}

            {(sessionStorage.getItem('linkSuccess') || linkSuccess) &&
                <div><h1>Congrats! You've Connected to your bank</h1>
                    <RenderTransactions />
                </div>}
        </div>
    );
}

export default ConnectToBank
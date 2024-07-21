import { useContext, useState } from 'react'
import GenerateLinkToken from './GenerateLinkToken'
import LaunchLink from './LaunchLink'
import PlaidLinkContext from '../../state/plaid/plaidLinkContext'
import RenderTransactions from './GenerateTransactions'
import Notification from '../../component/Notification';

const ConnectToBank = () => {
    const { linkSuccess, linkToken } = useContext(PlaidLinkContext)
    const [showComponent, setShowComponent] = useState<Boolean>(false);
    const [notificationError, setNotificationError] = useState<any>({
        openNotification: false,
        message: '',
        error: false
    });

    const handleClick = () => {
        setShowComponent(true);
    }

    const handleIsShowComponent = (isShow: boolean) => {
        setShowComponent(isShow);
    }

    return (
        <>
            <div>
                {!(sessionStorage.getItem('linkSuccess') || linkSuccess) && !linkToken && <button onClick={handleClick}>Connect My Bank</button>}
                {showComponent && (
                    <>
                        <GenerateLinkToken isShowComponent={handleIsShowComponent} setNotificationError={setNotificationError} />
                        <LaunchLink />
                    </>
                )}

                {(sessionStorage.getItem('linkSuccess') || linkSuccess) &&
                    <div><h1>Congrats! You've Connected to your bank</h1>
                        <RenderTransactions />
                    </div>}
            </div>
            <Notification open={notificationError.openNotification} message={notificationError.message} severity={'error'} onClose={() => setNotificationError({ ...notificationError, error: false, openNotification: false })}
            />

        </>
    );
}

export default ConnectToBank
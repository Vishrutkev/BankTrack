
import { useCallback, useContext, useEffect, useState } from 'react'
import { getInfo, generateLinkToken } from '../../fetch/plaid/generateToken'
import PlaidLinkContext from '../../state/plaid/plaidLinkContext'
import { PlaidItem, PlaidLinkToken } from '../../state/plaid/types/token';
import Notification from '../../component/Notification';
import { type } from 'os';

interface GenerateLinkTokenProps {
    isShowComponent: (isShow: boolean) => void;
    setNotificationError: any
}

const GenerateLinkToken = ({ isShowComponent, setNotificationError }: GenerateLinkTokenProps) => {
    const { dispatch } = useContext(PlaidLinkContext);

    const fetchInfo = useCallback(async () => {
        let paymentInitiation: boolean = false;
        const token = sessionStorage.getItem('token')!;
        try {
            const data: PlaidItem = await getInfo(token);
            paymentInitiation = data.products.includes("payment_initiation");
            sessionStorage.setItem('infoError', 'false');
            dispatch({
                type: "SET_STATE",
                state: {
                    products: data.products,
                    isPaymentInitiation: paymentInitiation,
                },
            });
        } catch (error) {
            isShowComponent(false);
            setNotificationError((prevState: any) => ({
                ...prevState,
                openNotification: true,
                message: 'Error fetching Plaid Products Info!',
                error: true
            }));
            sessionStorage.setItem('infoError', 'true');
            // You may also choose to re-throw the error if needed
            console.log("Error fetching Plaid Products Info");
        }
        return paymentInitiation;
    }, [dispatch]);

    const fetchLinkToken = useCallback(async (isPaymentInitiation: boolean) => {
        const endpoint = isPaymentInitiation ? '/api/create_link_token_for_payment' : '/api/create_link_token';
        const token = sessionStorage.getItem('token')!;
        try {
            const linkToken: PlaidLinkToken = await generateLinkToken(endpoint, token);
            dispatch({ type: "SET_STATE", state: { linkToken: linkToken.link_token } });
            sessionStorage.setItem("link_token", linkToken.link_token);
        }
        catch (error) {
            console.log("errororr");
            isShowComponent(false);
            setNotificationError((prevState: any) => ({
                ...prevState,
                openNotification: true,
                message: 'Error fetching Link Token!',
                error: true
            }));
            isShowComponent(false);
            console.log(error);
        };
    }, [dispatch]);

    useEffect(() => {
        const init = async () => {
            try {
                // Fetch and determine if payment initiation is required
                const isPaymentInitiation: boolean = await fetchInfo();
                // Check if we are in an OAuth state
                if (window.location.href.includes("?oauth_state_id=")) {
                    dispatch({
                        type: "SET_STATE",
                        state: {
                            linkToken: sessionStorage.getItem("link_token"),
                        },
                    });
                } else {
                    const infoError = JSON.parse(sessionStorage.getItem('infoError')!);
                    if (!infoError) {
                        await fetchLinkToken(isPaymentInitiation);
                    }
                }
            } catch (error) {
                console.error("Error in init:", error);
            }
        };
        init();
    }, [dispatch, fetchInfo, fetchLinkToken]);

    return (
        <>

        </>
    )
}

export default GenerateLinkToken

import { useCallback, useContext, useEffect } from 'react'
import { getInfo, generateLinkToken } from '../../fetch/plaid/generateToken'
import PlaidLinkContext from '../../state_management/plaid/plaidLinkContext';

const GenerateLinkToken = () => {
    const { linkToken, isPaymentInitiation, dispatch } = useContext(PlaidLinkContext);

    const fetchInfo = useCallback(() => {
        let paymentInitiation: boolean = false;
        getInfo()
            .then(async (response) => {
                const data = await response.json();

                paymentInitiation = data.products.includes("payment_initiation");

                dispatch({
                    type: "SET_STATE",
                    state: {
                        products: data.products,
                        isPaymentInitiation: paymentInitiation,
                    },
                });
                console.log(data);
            })
            .catch(error => {
                console.error("Error fetching info:", error);
            });
        return paymentInitiation
    }, [dispatch]);


    const fetchLinkToken = useCallback((isPaymentInitiation: boolean) => {
        const endpoint = isPaymentInitiation ? '/api/create_link_token_for_payment' : '/api/create_link_token';

        generateLinkToken(endpoint)
            .then(async data => {
                const token = await data.json();
                dispatch({ type: "SET_STATE", state: { linkToken: token.link_token } });
                localStorage.setItem("link_token", token.link_token);
            })
            .catch((error) => {
                console.log(error);
            });
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
                            linkToken: localStorage.getItem("link_token"),
                        },
                    });
                } else {
                    fetchLinkToken(isPaymentInitiation);
                }
            } catch (error) {
                console.error("Error in init:", error);
            }
        };
        init();
    }, [dispatch, fetchInfo, fetchLinkToken]);

    return (
        <div>{linkToken}</div>
    )
}

export default GenerateLinkToken
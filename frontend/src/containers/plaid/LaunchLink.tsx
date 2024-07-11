import React, { useEffect, useState, useContext } from 'react'
import { usePlaidLink } from "react-plaid-link";
import Button from "plaid-threads/Button";
import { exchangePublicTokenForAccessToken } from "../../fetch/plaid/generateToken";
import PlaidLinkContext from '../../state/plaid/plaidLinkContext';
import { AccessTokenResponse } from '../../state/plaid/types/token';

const LaunchLink = () => {
    const { linkToken, isPaymentInitiation, dispatch, isItemAccess, linkSuccess } = useContext(PlaidLinkContext);
    const onSuccess = React.useCallback(
        (public_token: string) => {
            // 'payment_initiation' products do not require the public_token to be exchanged for an access_token.
            if (isPaymentInitiation) {
                dispatch({ type: "SET_STATE", state: { isItemAccess: false } });
            } else {
                exchangePublicTokenForAccessToken(public_token)
                    .then(async (data: AccessTokenResponse) => {
                        dispatch({
                            type: "SET_STATE",
                            state: {
                                itemId: data.item_id,
                                accessToken: data.access_token,
                                isItemAccess: true,
                            },
                        });
                    })
                    .catch((err) => {
                        dispatch({
                            type: "SET_STATE",
                            state: {
                                itemId: `no item_id retrieved`,
                                accessToken: `no access_token retrieved`,
                                isItemAccess: false,
                            },
                        });
                    })
            }

            dispatch({ type: "SET_STATE", state: { linkSuccess: true } });
            window.history.pushState("", "", "/");
        },
        [dispatch, isPaymentInitiation]
    );

    let isOauth = false;
    const config: Parameters<typeof usePlaidLink>[0] = {
        token: linkToken!,
        onSuccess,
    };

    if (window.location.href.includes("?oauth_state_id=")) {
        // TODO: figure out how to delete this ts-ignore
        // @ts-ignore
        config.receivedRedirectUri = window.location.href;
        isOauth = true;
    }

    const { open, ready } = usePlaidLink(config);

    useEffect(() => {
        if (isOauth && ready) {
            open();
        }
    }, [ready, open, isOauth]);

    return (<div>
        {!linkSuccess && <Button type="button" large onClick={() => open()} disabled={!ready}>
            Launch Link
        </Button>}
    </div>

    );
};

export default LaunchLink;

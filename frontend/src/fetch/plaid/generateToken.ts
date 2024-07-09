import { BASE_URL } from "../constants";
// const generateToken = useCallback(
//     async (isPaymentInitiation: boolean) => {
//       const path = isPaymentInitiation
//         ? `${BASE_URL}/api/create_link_token_for_payment`
//         : `${BASE_URL}/api/create_link_token`;
//       try {
//         const response = await fetch(path, {
//           method: "POST",
//         });
//         if (!response.ok) {
//           console.error("HTTP error:", response.status, response.statusText);
//           return;
//         }
//         const data = await response.json();
//         if (data.error) {
//           console.error("API error:", data.error);
//           return;
//         }
//         //dispatch({ type: "SET_STATE", state: { linkToken: data.link_token } });
//         localStorage.setItem("link_token", data.link_token);

//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     },
//     []
//   );

// const getInfo = useCallback(async () => {
//     const response = await fetch(`${BASE_URL}/api/info`, {
//       method: "POST",
//     });
//     if (!response.ok) {
//       dispatch({ type: "SET_STATE", state: { backend: false } });
//       return { paymentInitiation: false };
//     }
//     const data = await response.json();
//     const paymentInitiation: boolean =
//       data.products.includes("payment_initiation");
//     dispatch({
//       type: "SET_STATE",
//       state: {
//         products: data.products,
//         isPaymentInitiation: paymentInitiation,
//       },
//     });
//     return { paymentInitiation };
//   }, [dispatch]);

const getInfo = () => {
  return new Promise<any>((resolve, reject) => {
    fetch(`${BASE_URL}/api/info`, { method: "POST" })
      .then((res) => resolve(res))
      .catch((_: any) => reject());
  });
};

const generateLinkToken = (endpoint: string) => {
  return new Promise<any>((resolve, reject) => {
    fetch(BASE_URL + endpoint, { method: "POST" })
      .then((res) => {
        resolve(res);
      })
      .catch((_: any) => reject());
  });
};

const exchangePublicTokenForAccessToken = (public_token: string | null) => {
  return new Promise(async (resolve, reject) => {
    await fetch(BASE_URL + "/api/set_access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: `public_token=${public_token}`,
    })
      .then((res) => resolve(res))
      .catch((_: any) => reject());
  });
};

export { getInfo, generateLinkToken, exchangePublicTokenForAccessToken };

import {
  PlaidItem,
  PlaidLinkToken,
  AccessTokenResponse,
} from "../../state/plaid/types/token";
import { BASE_URL } from "../constants";

const getInfo = (token: string): Promise<PlaidItem> => {
  return new Promise<PlaidItem>((resolve, reject) => {
    fetch(`${BASE_URL}/api/info`, {
      method: "POST",
      headers: {
        "X-Auth-Token": token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          reject(new Error(`HTTP error! status: ${res.status}`));
        }
        return res.json();
      })
      .then((data) => resolve(data))
      .catch((error) => {
        console.error("Fetch error:", error);
        reject(error);
      });
  });
};

const generateLinkToken = (
  endpoint: string,
  token: string
): Promise<PlaidLinkToken> => {
  return new Promise<PlaidLinkToken>((resolve, reject) => {
    fetch(BASE_URL + endpoint, {
      method: "POST",
      headers: {
        "X-Auth-Token": token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          reject(new Error(`HTTP error! status: ${res.status}`));
        }
        return res.json();
      })
      .then((data) => resolve(data))
      .catch((error) => {
        console.error("Fetch error:", error);
        reject(error);
      });
  });
};

const exchangePublicTokenForAccessToken = (
  public_token: string | null,
  token: string
): Promise<AccessTokenResponse> => {
  return new Promise<AccessTokenResponse>(async (resolve, reject) => {
    try {
      const res = await fetch(BASE_URL + "/api/set_access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "X-Auth-Token": token,
        },
        body: `public_token=${public_token}`,
      });
      if (!res.ok) {
        reject(new Error(`HTTP error! status: ${res.status}`));
      }
      const data = await res.json();
      resolve(data);
    } catch (error) {
      console.error("Fetch error:", error);
      reject(error);
    }
  });
};

export { getInfo, generateLinkToken, exchangePublicTokenForAccessToken };

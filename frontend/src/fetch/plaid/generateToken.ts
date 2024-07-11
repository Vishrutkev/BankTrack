import {
  PlaidItem,
  PlaidLinkToken,
  AccessTokenResponse,
} from "../../state/plaid/types/token";
import { BASE_URL } from "../constants";

const getInfo = (): Promise<PlaidItem> => {
  return new Promise<PlaidItem>((resolve, reject) => {
    fetch(`${BASE_URL}/api/info`, { method: "POST" })
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

const generateLinkToken = (endpoint: string): Promise<PlaidLinkToken> => {
  return new Promise<PlaidLinkToken>((resolve, reject) => {
    fetch(BASE_URL + endpoint, { method: "POST" })
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
  public_token: string | null
): Promise<AccessTokenResponse> => {
  return new Promise<AccessTokenResponse>(async (resolve, reject) => {
    try {
      const res = await fetch(BASE_URL + "/api/set_access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
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

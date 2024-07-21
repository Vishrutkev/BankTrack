import { TransactionsData } from "../../state/plaid/types/transaction";
import { BASE_URL } from "../constants";

const fetchIncome = (token: string) => {
  return new Promise<TransactionsData>((resolve, reject) => {
    fetch(`${BASE_URL}/api/income/verification/paystubs`, {
      method: "GET",
      headers: {
        "x-auth-token": token,
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

export { fetchIncome };

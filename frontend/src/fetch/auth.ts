import { METHODS } from "http";
import { BASE_URL } from "./constants";

export const signIn = (email: string, password: string) => {
  const data = {
    email,
    password,
  };
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

export const signUp = (name: string, email: string, password: string) => {
  const data = {
    name,
    email,
    password,
  };
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

export const checkAuth = (token: String) => {
  const data = {
    token: token,
  };
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/api/checkAuth?token=${token}`, {
      method: "GET",
    })
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

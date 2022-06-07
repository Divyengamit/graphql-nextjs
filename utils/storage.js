import { Decryption, Encryption } from "./EncryptDecrypt";

export const setLocal = (key, value) => localStorage.setItem(key, value);

export const getLocal = (key) => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const item = localStorage.getItem(key);
    return item;
  }
};
export const removeLocal = (key) => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const item = localStorage.removeItem(key);
    return item;
  }
};

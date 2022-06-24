import CryptoJS from "crypto-js";
import { getLocal } from "./storage";

export const Decryption = (data) => {
  try {
    if (process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY) {
      const bytes = CryptoJS.AES.decrypt(
        data,
        process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY
      );
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } else return data;
  } catch (e) {
    return false;
  }
};
export const Encryption = (data) => {
  if (process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY)
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY
    ).toString();
  else return data;
};

export const getUserID = () => {
  const userId = getLocal("userId");
  const bytes = CryptoJS.AES.decrypt(
    userId,
    process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY
  );
  let tempData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  tempData = JSON.parse(tempData);
  return tempData?.state?.userId;
};

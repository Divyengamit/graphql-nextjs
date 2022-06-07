import CryptoJS from "crypto-js";

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

import CryptoJS from "crypto-js";

export const Decryption = (data) => {
  console.log("Decryption data", data);
  try {
    if (process.env.REACT_APP_ENC_KEY) {
      const bytes = CryptoJS.AES.decrypt(data, process.env.REACT_APP_ENC_KEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } else return data;
  } catch (e) {
    return false;
  }
};
export const Encryption = (data) => {
  console.log("Encryption data", data);
  if (process.env.REACT_APP_ENC_KEY)
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      process.env.REACT_APP_ENC_KEY
    ).toString();
  else return data;
};

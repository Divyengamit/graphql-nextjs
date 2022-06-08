import Cors from "cors";
import { useRouter } from "next/router";
const cors = Cors({
  methods: ["GET", "HEAD", "POST"],
});
import axios from "axios";
// const router = useRouter();
// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
export default async function handler(req, res) {
  try {
    // Run the middleware
    await runMiddleware(req, res, cors);
    const { token } = req.query;
    //   verify the token
    let { data: tokenVerification } = await axios({
      method: "POST",
      url: `https://ppi-test.canopi.in/canopi-payments/registration/v1/verify-redirect-token`,
      data: {
        access_token: token,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!tokenVerification) return;
    //   get access token
    let { data } = await axios({
      method: "POST",
      url: `https://ppi-test.canopi.in/canopi-payments/registration/v1/authenticate-redirect`,
      data: {
        tenantId: tokenVerification.tenantId,
        tenant_secret_key: tokenVerification.tenant_secret_key,
        entityId: tokenVerification.entityId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.redirect("/home");
    res.status(200).json({ name: "John Doe", body: data });
  } catch (err) {
    res.status(200).json({ error: "Not valid" });
  }
}

import { KEYUTIL, KJUR } from "jsrsasign";

export default {
  sign(payload, secret, options) {
    const tNow = KJUR.jws.IntDate.get("now");
    const tEnd = KJUR.jws.IntDate.get("now + 1day");
    const header = {
      alg: options.algorithm,
      typ: "JWT"
    };

    const privateKey = KEYUTIL.getKey(secret);

    payload.iat = tNow;
    payload.exp = tEnd;

    console.log(options.algorithm, header, payload, privateKey);

    return {
      JWT: KJUR.jws.JWS.sign(options.algorithm, header, payload, privateKey),
      payload
    };
  }
};

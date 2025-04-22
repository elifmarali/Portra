import { jwtVerify } from "jose";

const getJwtSecretKey = () => {
    const secretKey = process.env.JWT_SECRET_KEY;

    if(!secretKey){
        throw new Error("JWT secret key is not available");
    }

    const encode = new TextEncoder().encode(secretKey);
    console.log("encode : ",encode);
    return encode
}

async function verifyJWTToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (err) {
    return null;
  }
}
 
export default verifyJWTToken;
import dotenv from "dotenv";

dotenv.config();

if (!process.env.SECRET_JWT) {
  throw new Error("JWT_SECRET must be defined");
}

export const ENV = {
  SECRET_JWT: process.env.SECRET_JWT,
};

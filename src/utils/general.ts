import dotenv from "dotenv";
import { EnvTypes } from "src/interfaces/env";

dotenv.config();

export function getEnv(env: EnvTypes) {
  return process.env[env] || "";
}

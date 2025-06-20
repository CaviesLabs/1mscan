import dotenv from "dotenv";

const env = `.env.${process.env.NEXT_PUBLIC_APP_ENV || "dev"}`;
console.log(`Loading env from ${env}`);

// Load environment variables
dotenv.config({
  path: env,
});

import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
  },
  client: {
    NEXT_PUBLIC_API_KEY: z.string(),
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_HANDTALK_TOKEN: z.string(),
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_HANDTALK_TOKEN: process.env.NEXT_PUBLIC_HANDTALK_TOKEN,
  },
})

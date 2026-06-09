import crypto from "node:crypto";

export interface TgUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface VerifiedInit {
  user: TgUser;
  startParam: string | null;
}

/**
 * Validate Telegram Mini App initData per the official algorithm:
 *   secret  = HMAC_SHA256(key="WebAppData", msg=bot_token)
 *   check   = HMAC_SHA256(key=secret, msg=data_check_string)
 * data_check_string = sorted "key=value" lines (excluding `hash`), joined by "\n".
 *
 * Returns the verified user + start_param, or null if invalid/expired.
 */
export function verifyInitData(initData: string, botToken: string, maxAgeSec = 86400): VerifiedInit | null {
  if (!initData || !botToken) return null;
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(initData);
  } catch {
    return null;
  }

  const hash = params.get("hash");
  if (!hash) return null;

  const pairs: string[] = [];
  for (const [k, v] of params) {
    if (k === "hash") continue;
    pairs.push(`${k}=${v}`);
  }
  pairs.sort();
  const dataCheckString = pairs.join("\n");

  const secret = crypto.createHmac("sha256", "WebAppData").update(botToken).digest();
  const computed = crypto.createHmac("sha256", secret).update(dataCheckString).digest("hex");

  // constant-time compare
  const a = Buffer.from(computed, "hex");
  const b = Buffer.from(hash, "hex");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  // optional freshness check
  const authDate = Number(params.get("auth_date") || 0);
  if (authDate && maxAgeSec > 0) {
    const ageSec = Math.floor(Date.now() / 1000) - authDate;
    if (ageSec > maxAgeSec) return null;
  }

  const userRaw = params.get("user");
  if (!userRaw) return null;
  let user: TgUser;
  try {
    user = JSON.parse(userRaw);
  } catch {
    return null;
  }
  if (!user?.id) return null;

  return { user, startParam: params.get("start_param") };
}

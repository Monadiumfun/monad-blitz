// Blitz Telegram bot — long-polling, zero external deps.
// - /start [code]  -> sends a "Play" button that launches the mini app (carrying ?ref=code)
// - sets the persistent menu button to the mini app
// Run with: node --env-file=.env scripts/bot.mjs   (or `npm run bot`)
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const MINI_APP_URL = (process.env.MINI_APP_URL || "").replace(/\/$/, "");

if (!TOKEN) throw new Error("TELEGRAM_BOT_TOKEN missing");
if (!MINI_APP_URL) throw new Error("MINI_APP_URL missing (set it in .env after you have an HTTPS URL)");

const API = `https://api.telegram.org/bot${TOKEN}`;

async function call(method, body) {
  const res = await fetch(`${API}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.ok) console.error(`[${method}]`, data.description);
  return data;
}

function appUrl(ref) {
  return ref ? `${MINI_APP_URL}/?ref=${encodeURIComponent(ref)}` : `${MINI_APP_URL}/`;
}

async function configure() {
  await call("setChatMenuButton", {
    menu_button: { type: "web_app", text: "🎮 Play", web_app: { url: appUrl() } },
  });
  await call("setMyCommands", {
    commands: [
      { command: "start", description: "Launch Blitz" },
      { command: "play", description: "Open the games" },
    ],
  });
  console.log("[bot] menu button + commands configured →", appUrl());
}

async function onStart(chatId, payload) {
  const url = appUrl(payload);
  const text = payload
    ? `🎮 *Blitz* — you were invited with code \`${payload}\`!\nTap below to create your handle and play.`
    : "🎮 *Blitz* on Monad\nMini-games, referrals & a live leaderboard. Tap to play 👇";
  await call("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [[{ text: "▶️ Play Blitz", web_app: { url } }]],
    },
  });
}

async function poll() {
  let offset = 0;
  console.log("[bot] polling for updates…");
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const res = await call("getUpdates", { offset, timeout: 30, allowed_updates: ["message"] });
      for (const u of res.result || []) {
        offset = u.update_id + 1;
        const msg = u.message;
        if (!msg?.text) continue;
        const [cmd, ...rest] = msg.text.trim().split(/\s+/);
        if (cmd === "/start" || cmd === "/play") {
          await onStart(msg.chat.id, rest[0] || "");
        }
      }
    } catch (e) {
      console.error("[bot] poll error:", e.message);
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

await configure();
await poll();

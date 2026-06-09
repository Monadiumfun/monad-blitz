# Blitz — Telegram Mini App (Monad Blitz)

Telegram Mini App for [Monadiumfun/monad-blitz](https://github.com/Monadiumfun/monad-blitz):
onboarding with a **permanent username**, a **referral system** with a live
**leaderboard**, and 3 mini-games (Higher or Lower, Laser Party, Death Run).

Bot: [@monad_blitz_bot](https://t.me/monad_blitz_bot)

## Stack

- **Frontend**: React 19 + Vite + Tailwind v4 (the original game hub, extended)
- **Backend**: Vercel serverless functions (`/api/*.ts`) + **libSQL** (local file in dev, Turso in prod)
- **Auth**: Telegram Mini App `initData` HMAC validation (bot token)
- **Chain**: Monad testnet — **BLITZ** ERC20 token deployed (game economy comes next)
- **Bot**: zero-dep long-polling script (`scripts/bot.mjs`)

## On-chain (Monad testnet, chainId 10143)

| Item | Address |
|------|---------|
| Deployer wallet | `0x1f600e0Ad0Cb444b1C797BB48d5bF0dc4F25AEe5` |
| **BLITZ token** | `0xeF9F2AD32b98E3e3D5E37b985289cbB3540CDD13` |

BLITZ: 1,000,000,000 supply, public one-time `claim()` faucet (1000 BLITZ),
owner `mint`/`airdrop`. Source: `contracts/src/BlitzToken.sol`.

### Per-user wallets + auto-funding

On registration, each account gets its **own wallet**, derived deterministically
from `MASTER_WALLET_SEED + telegram_id` (`api/_lib/wallet.ts`) — permanently tied
to the username, never stored at rest, recomputable for signing. The backend then
funds it from the deployer: **10,000 BLITZ + 0.1 MON** (`USER_BLITZ_GRANT` /
`USER_MON_GRANT`). `/api/me` self-heals funding if a prior attempt failed and
returns live on-chain balances.

> **Monad gas note:** the testnet RPC is load-balanced & eventually-consistent —
> firing deployer txs back-to-back makes later ones revert (consuming full gas).
> `fundNewUser` spaces txs (`FUND_STEP_DELAY_MS`, default 2500) and retries on
> revert. Do **not** set an explicit `gas` limit on value transfers — Monad
> reverts those; let viem estimate. Funding is serialized to avoid nonce races
> (single-process; for multi-instance Vercel, move funding to one worker/queue).

## Run locally

```bash
pnpm install
pnpm dev          # vite (5173) + api dev server (3001)
```

Expose over HTTPS for Telegram (Mini Apps require HTTPS):

```bash
cloudflared tunnel --url http://localhost:5173
# put the printed https URL into .env as MINI_APP_URL, then:
pnpm bot          # configures the menu button + handles /start <refcode>
```

Open Telegram → @monad_blitz_bot → **/start** → tap **Play**.

### Referral flow

- `/start <code>` → bot sends a Play button to `MINI_APP_URL/?ref=<code>`.
- New user's onboarding prefills the referral code (they can edit or skip).
- Each referral increments the referrer's count → leaderboard ranks by referrals.
- A user's invite link is `https://t.me/monad_blitz_bot?startapp=<username>`
  (works once the **Main Mini App** is set in BotFather — optional, see below).

## Deploy to Vercel (prod)

1. Create a Turso DB (serverless SQLite) and grab its URL + token.
2. In Vercel project env vars, set:
   `TELEGRAM_BOT_TOKEN`, `BOT_USERNAME`, `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`.
   (Do **not** set `ALLOW_DEV_AUTH` in prod.)
3. `vercel --prod` → get the deployment URL.
4. Set `MINI_APP_URL` to that URL and restart `pnpm bot`.
5. Optional: in BotFather, set the **Main Mini App** URL to enable
   `?startapp=` deep links (the `t.me/bot?startapp=code` referral links).

## Env vars

See `.env.example`. `.env` (gitignored) holds the bot token and the testnet
deployer key.

## Project layout

```
api/            Vercel serverless functions + _lib (db, telegram, http)
src/            React app: onboarding/, components/, games/, lib/ (api, telegram)
contracts/      Foundry — BlitzToken.sol (NadPaymaster deferred under _deferred/)
scripts/bot.mjs Telegram long-polling bot
```

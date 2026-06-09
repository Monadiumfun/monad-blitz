import { useState } from "react";
import { hapticTap, openTelegramLink } from "../lib/telegram";

interface Props {
  refCode: string;
  referralLink: string;
}

/** "Invite friends, top the leaderboard" card — Telegram share + copy link. */
function InviteCard({ refCode, referralLink }: Props) {
  const [copied, setCopied] = useState(false);

  function share() {
    hapticTap();
    const text = `Play on Monad with me 🎮 — use my code "${refCode}" or just tap:`;
    openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="rounded-2xl border border-[#6E54FF]/25 bg-gradient-to-br from-[#6E54FF]/[0.07] to-transparent p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-bold text-white">Invite friends, top the leaderboard</p>
          <p className="text-xs text-gray-400">
            Your code: <span className="text-[#6E54FF] font-semibold">{refCode}</span>
          </p>
        </div>
        <span className="text-2xl">🎯</span>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={share}
          className="flex-1 rounded-xl bg-[#6E54FF] py-2.5 text-sm font-bold text-white active:scale-[0.98] transition-transform"
        >
          Share invite
        </button>
        <button
          onClick={copy}
          className="rounded-xl border border-[#2a2a3a] px-4 py-2.5 text-sm font-semibold text-gray-300 hover:text-white active:scale-[0.98] transition-all"
        >
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}

export default InviteCard;

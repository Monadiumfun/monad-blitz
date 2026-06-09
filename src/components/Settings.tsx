import { useState, type ReactNode } from "react";
import type { ApiUser } from "../lib/api";
import { hapticTap, openLink, openTelegramLink } from "../lib/telegram";

interface Props {
  user: ApiUser;
  onBack: () => void;
}

// Block explorer for Monad testnet. Swap this base if you use a different one.
const EXPLORER = "https://monad.socialscan.io";
const explorerAddress = (addr: string) => `${EXPLORER}/address/${addr}`;

function short(addr: string): string {
  return addr.length > 12 ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : addr;
}

function fmt(n: string | undefined): string {
  return Math.floor(Number(n ?? 0)).toLocaleString("en-US");
}

function Settings({ user, onBack }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      hapticTap();
      setCopied(label);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* ignore */
    }
  }

  const wallet = user.walletAddress;

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0f] flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-[420px] flex flex-col gap-5">
        <header className="flex items-center justify-between">
          <button onClick={onBack} className="text-sm text-[#6b7280] hover:text-white transition-colors flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
          <h1 className="text-lg font-bold text-white">⚙️ Settings</h1>
          <div className="w-[44px]" />
        </header>

        {/* Account */}
        <Section title="Account">
          <Row label="Username" value={`@${user.username}`} hint="permanent" />
          <Row label="Referrals" value={String(user.referrals)} />
          <Row label="Referral code" value={user.refCode} onCopy={() => copy("code", user.refCode)} copied={copied === "code"} />
        </Section>

        {/* Wallet */}
        <Section title="Wallet">
          {wallet ? (
            <>
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-gray-500">Address</span>
                  <span className="font-mono text-sm text-white">{short(wallet)}</span>
                </div>
                <button
                  onClick={() => copy("addr", wallet)}
                  className="rounded-lg border border-[#2a2a3a] px-3 py-1.5 text-xs font-semibold text-gray-300 hover:text-white active:scale-95 transition"
                >
                  {copied === "addr" ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="flex gap-3 pt-1">
                <Stat label="BLITZ" value={fmt(user.balances?.blitz)} />
                <Stat label="MON" value={user.balances?.mon ?? "0"} />
              </div>
              <button
                onClick={() => {
                  hapticTap();
                  openLink(explorerAddress(wallet));
                }}
                className="mt-1 w-full rounded-xl bg-[#6E54FF] py-2.5 text-sm font-bold text-white active:scale-[0.98] transition"
              >
                View transactions on explorer ↗
              </button>
            </>
          ) : (
            <p className="text-sm text-gray-500">No wallet yet — it's created when you finish onboarding.</p>
          )}
        </Section>

        {/* Invite */}
        <Section title="Invite">
          <p className="text-xs text-gray-400 leading-snug">Share your link to climb the referral leaderboard.</p>
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => {
                hapticTap();
                const text = `Play on Monad with me 🎮 — use my code "${user.refCode}" or just tap:`;
                openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(user.referralLink)}&text=${encodeURIComponent(text)}`);
              }}
              className="flex-1 rounded-xl bg-[#6E54FF] py-2.5 text-sm font-bold text-white active:scale-[0.98] transition"
            >
              Share invite
            </button>
            <button
              onClick={() => copy("link", user.referralLink)}
              className="rounded-xl border border-[#2a2a3a] px-4 py-2.5 text-sm font-semibold text-gray-300 hover:text-white active:scale-[0.98] transition"
            >
              {copied === "link" ? "Copied!" : "Copy link"}
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[#2a2a3a] bg-[#12121a] p-4">
      <span className="text-[11px] uppercase tracking-wider text-[#6E54FF] font-semibold">{title}</span>
      {children}
    </div>
  );
}

function Row({
  label,
  value,
  hint,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  hint?: string;
  onCopy?: () => void;
  copied?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[11px] uppercase tracking-wider text-gray-500">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-white">{value}</span>
        {hint && <span className="text-[9px] uppercase tracking-wide text-gray-500 border border-[#2a2a3a] rounded px-1.5 py-0.5">{hint}</span>}
        {onCopy && (
          <button onClick={onCopy} className="text-xs text-gray-400 hover:text-white">
            {copied ? "✓" : "copy"}
          </button>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-gray-500">{label}</div>
      <div className="text-base font-bold text-[#6E54FF] tabular-nums truncate">{value}</div>
    </div>
  );
}

export default Settings;

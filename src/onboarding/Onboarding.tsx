import { useState, lazy, Suspense } from "react";
import { api, type ApiUser } from "../lib/api";
import { haptic, hapticTap } from "../lib/telegram";

const MonadGradientBackground = lazy(() => import("../components/MonadGradientBackground"));

interface Props {
  firstName: string | null;
  suggestedRef: string | null;
  onComplete: (user: ApiUser) => void;
}

const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/;

function Onboarding({ firstName, suggestedRef, onComplete }: Props) {
  const [step, setStep] = useState<"username" | "referral">("username");
  const [username, setUsername] = useState("");
  const [refCode, setRefCode] = useState(suggestedRef ?? "");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const usernameValid = USERNAME_RE.test(username);

  function nextFromUsername() {
    if (!usernameValid) {
      setError("3–20 characters: letters, numbers, underscore.");
      return;
    }
    setError(null);
    hapticTap();
    setStep("referral");
  }

  async function submit(withRef: boolean) {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const { user } = await api.register(username, withRef ? refCode.trim() : "");
      haptic("success");
      onComplete(user);
    } catch (e) {
      haptic("error");
      const err = e as Error & { code?: string };
      // a bad/absent referral shouldn't trap the user — let them skip
      setError(err.message || "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center px-5 py-8">
      <Suspense fallback={null}>
        <MonadGradientBackground />
      </Suspense>
      <div className="relative z-10 w-full max-w-[420px] flex flex-col flex-1">
        <header className="text-center mb-8 mt-4">
          <h1 className="text-3xl text-white brand">
            Blitz
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            {step === "username"
              ? `Welcome${firstName ? `, ${firstName}` : ""}! Pick your handle to get started.`
              : "Got an invite code? Drop it in — or skip."}
          </p>
        </header>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Dot active={step === "username"} done={step === "referral"} />
          <div className="h-px w-8 bg-[#2a2a3a]" />
          <Dot active={step === "referral"} done={false} />
        </div>

        {step === "username" && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
              Choose your username
            </label>
            <input
              autoFocus
              value={username}
              onChange={(e) => {
                setUsername(e.target.value.replace(/\s/g, ""));
                setError(null);
              }}
              onKeyDown={(e) => e.key === "Enter" && nextFromUsername()}
              placeholder="e.g. nadking"
              maxLength={20}
              className="w-full rounded-xl bg-[#12121a] border-2 border-[#2a2a3a] focus:border-[#a2e634] outline-none px-4 py-3.5 text-white text-lg font-semibold transition-colors"
            />
            <div className="flex items-center gap-2 rounded-lg bg-[#a2e634]/[0.06] border border-[#a2e634]/20 px-3 py-2.5">
              <span className="text-[#a2e634] text-sm">⚠️</span>
              <p className="text-xs text-gray-300 leading-snug">
                Your username is <b className="text-white">permanent</b> and cannot be changed later. Choose wisely.
              </p>
            </div>
            {error && <p className="text-sm text-[#e74c3c]">{error}</p>}
            <button
              onClick={nextFromUsername}
              disabled={!usernameValid}
              className="mt-2 w-full rounded-xl bg-[#a2e634] disabled:bg-[#2a2a3a] disabled:text-gray-500 py-3.5 text-base font-bold text-[#0a0a0f] transition-all active:scale-[0.98]"
            >
              Continue
            </button>
          </div>
        )}

        {step === "referral" && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
              Referral code (optional)
            </label>
            <input
              autoFocus
              value={refCode}
              onChange={(e) => {
                setRefCode(e.target.value.replace(/\s/g, ""));
                setError(null);
              }}
              placeholder="friend's username"
              maxLength={20}
              className="w-full rounded-xl bg-[#12121a] border-2 border-[#2a2a3a] focus:border-[#a2e634] outline-none px-4 py-3.5 text-white text-lg font-semibold transition-colors"
            />
            <p className="text-xs text-gray-500 leading-snug">
              Entering a friend's code credits them a referral. Climb the leaderboard by inviting others once you're in!
            </p>
            {error && <p className="text-sm text-[#e74c3c]">{error}</p>}
            <button
              onClick={() => submit(true)}
              disabled={busy || !refCode.trim()}
              className="mt-2 w-full rounded-xl bg-[#a2e634] disabled:bg-[#2a2a3a] disabled:text-gray-500 py-3.5 text-base font-bold text-[#0a0a0f] transition-all active:scale-[0.98]"
            >
              {busy ? "Creating…" : "Use code & continue"}
            </button>
            <button
              onClick={() => submit(false)}
              disabled={busy}
              className="w-full rounded-xl border border-[#2a2a3a] py-3 text-sm font-semibold text-gray-400 hover:text-white transition-colors active:scale-[0.98]"
            >
              Skip
            </button>
            <button
              onClick={() => { setStep("username"); setError(null); }}
              className="text-xs text-gray-600 hover:text-gray-400 mt-1"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Dot({ active, done }: { active: boolean; done: boolean }) {
  return (
    <div
      className={`h-2.5 w-2.5 rounded-full transition-colors ${
        active ? "bg-[#a2e634]" : done ? "bg-[#a2e634]/50" : "bg-[#2a2a3a]"
      }`}
    />
  );
}

export default Onboarding;

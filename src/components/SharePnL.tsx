import { useEffect, useRef, useState } from "react";
import { useUser } from "../lib/userContext";
import { hapticTap, openTelegramLink } from "../lib/telegram";

interface Props {
  game: string; // display name, e.g. "Laser Party"
  emoji: string;
  multiplier: number;
  wager: number;
}

const W = 600;
const H = 760;
const PURPLE = "#6E54FF";

function fmt(n: number): string {
  return Math.max(0, Math.round(n)).toLocaleString("en-US");
}

/** A "Share win" button that renders a PnL card to a canvas and shares it on Telegram. */
function SharePnL({ game, emoji, multiplier, wager }: Props) {
  const user = useUser();
  const [open, setOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const payout = wager * multiplier;
  const username = user?.username ?? "player";
  const refCode = user?.refCode ?? "";
  const referralLink = user?.referralLink ?? "https://t.me/monad_blitz_bot";

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      try {
        await Promise.all([
          document.fonts.load('800 80px "Gabarito"'),
          document.fonts.load('400 14px "Press Start 2P"'),
        ]);
      } catch {
        /* fonts optional */
      }
      if (cancelled) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      draw(canvas.getContext("2d")!, { emoji, game, payout, multiplier, username, refCode, referralLink });
    })();
    return () => {
      cancelled = true;
    };
  }, [open, emoji, game, payout, multiplier, username, refCode, referralLink]);

  // Share the rendered card as an IMAGE via the native share sheet (so the card
  // actually gets attached); fall back to a Telegram link share if files aren't
  // shareable (e.g. desktop).
  async function share() {
    hapticTap();
    const text = `I just won ${fmt(payout)} $BLITZ on ${game} (${multiplier.toFixed(2)}×) 🎮\nPlay on Monad — use my code "${refCode}":`;
    const canvas = canvasRef.current;
    try {
      const blob = canvas ? await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/png")) : null;
      const file = blob ? new File([blob], "blitz-win.png", { type: "image/png" }) : null;
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text });
        return;
      }
    } catch {
      /* user cancelled or sharing unsupported — fall through */
    }
    openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`);
  }

  return (
    <>
      <button
        onClick={() => {
          hapticTap();
          setOpen(true);
        }}
        className="w-full py-3 rounded-xl bg-[#6E54FF] text-white font-bold text-sm active:scale-[0.97] transition"
      >
        Share win 📤
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/80 px-4 animate-fade-in">
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            style={{ width: "min(86vw, 320px)", height: "auto", borderRadius: 16 }}
          />
          <div className="flex gap-2 w-[min(86vw,320px)]">
            <button
              onClick={share}
              className="flex-1 py-3 rounded-xl bg-[#6E54FF] text-white font-bold text-sm active:scale-[0.97] transition"
            >
              Share
            </button>
            <button
              onClick={() => setOpen(false)}
              className="rounded-xl border border-[#2a2a3a] px-5 py-3 text-sm font-semibold text-gray-300 hover:text-white active:scale-[0.97] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function draw(
  ctx: CanvasRenderingContext2D,
  d: { emoji: string; game: string; payout: number; multiplier: number; username: string; refCode: string; referralLink: string },
) {
  // background
  ctx.fillStyle = "#0a0a0f";
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W / 2, 250, 40, W / 2, 250, 520);
  glow.addColorStop(0, "rgba(110,84,255,0.55)");
  glow.addColorStop(0.5, "rgba(60,40,150,0.22)");
  glow.addColorStop(1, "rgba(10,10,15,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // grain
  ctx.globalAlpha = 0.06;
  for (let i = 0; i < 1400; i++) {
    ctx.fillStyle = i % 2 ? "#ffffff" : "#000000";
    ctx.fillRect((i * 97) % W, (i * 53) % H, 2, 2);
  }
  ctx.globalAlpha = 1;

  // border
  ctx.strokeStyle = "rgba(110,84,255,0.4)";
  ctx.lineWidth = 2;
  roundRect(ctx, 16, 16, W - 32, H - 32, 22);
  ctx.stroke();

  ctx.textAlign = "center";

  // wordmark
  ctx.save();
  ctx.shadowColor = "rgba(110,84,255,0.8)";
  ctx.shadowBlur = 24;
  ctx.fillStyle = "#ffffff";
  ctx.font = '800 56px "Gabarito", system-ui, sans-serif';
  ctx.fillText("BLITZ", W / 2, 110);
  ctx.restore();

  // game label
  ctx.fillStyle = "#8898a8";
  ctx.font = '400 16px "Press Start 2P", monospace';
  ctx.fillText(`${d.emoji}  ${d.game.toUpperCase()}`, W / 2, 180);

  // winnings
  ctx.fillStyle = "#586878";
  ctx.font = '400 15px "Press Start 2P", monospace';
  ctx.fillText("YOU WON", W / 2, 300);

  ctx.save();
  ctx.shadowColor = "rgba(110,84,255,0.9)";
  ctx.shadowBlur = 30;
  ctx.fillStyle = "#ffffff";
  ctx.font = '800 96px "Gabarito", system-ui, sans-serif';
  ctx.fillText(`+${fmt(d.payout)}`, W / 2, 390);
  ctx.restore();

  ctx.fillStyle = PURPLE;
  ctx.font = '800 30px "Gabarito", system-ui, sans-serif';
  ctx.fillText("$BLITZ", W / 2, 430);

  // multiplier pill
  const pill = `${d.multiplier.toFixed(2)}×`;
  ctx.font = '400 20px "Press Start 2P", monospace';
  const pw = ctx.measureText(pill).width + 48;
  ctx.fillStyle = "rgba(110,84,255,0.18)";
  roundRect(ctx, W / 2 - pw / 2, 470, pw, 56, 16);
  ctx.fill();
  ctx.fillStyle = PURPLE;
  ctx.fillText(pill, W / 2, 508);

  // username
  ctx.fillStyle = "#f0f0f0";
  ctx.font = '400 18px "Press Start 2P", monospace';
  ctx.fillText(`@${d.username}`, W / 2, 580);

  // divider
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.beginPath();
  ctx.moveTo(60, 620);
  ctx.lineTo(W - 60, 620);
  ctx.stroke();

  // invite
  ctx.fillStyle = "#8898a8";
  ctx.font = '400 13px "Press Start 2P", monospace';
  ctx.fillText("PLAY WITH MY CODE", W / 2, 660);
  ctx.fillStyle = "#ffffff";
  ctx.font = '800 34px "Gabarito", system-ui, sans-serif';
  ctx.fillText(d.refCode.toUpperCase(), W / 2, 702);

  ctx.fillStyle = "#586878";
  ctx.font = '400 11px "Press Start 2P", monospace';
  ctx.fillText("BUILT ON MONAD", W / 2, 738);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export default SharePnL;

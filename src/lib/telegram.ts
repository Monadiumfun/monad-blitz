// Thin wrapper around the Telegram Mini App SDK (loaded in index.html).

interface TgWebApp {
  initData: string;
  initDataUnsafe: {
    user?: { id: number; first_name?: string; username?: string };
    start_param?: string;
  };
  ready: () => void;
  expand: () => void;
  colorScheme: "light" | "dark";
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;
  HapticFeedback?: {
    impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void;
    notificationOccurred: (type: "error" | "success" | "warning") => void;
    selectionChanged: () => void;
  };
  openTelegramLink?: (url: string) => void;
  openLink?: (url: string, options?: { try_instant_view?: boolean }) => void;
  showAlert?: (msg: string) => void;
}

declare global {
  interface Window {
    Telegram?: { WebApp?: TgWebApp };
  }
}

export function tg(): TgWebApp | null {
  return window.Telegram?.WebApp ?? null;
}

/** True when running inside the Telegram client (has signed initData). */
export function isTelegram(): boolean {
  const w = tg();
  return !!w && !!w.initData;
}

export function initTelegram(): void {
  const w = tg();
  if (!w) return;
  w.ready();
  w.expand();
  w.setHeaderColor?.("#0a0a0f");
  w.setBackgroundColor?.("#0a0a0f");
}

export function getInitData(): string {
  return tg()?.initData ?? "";
}

export function getStartParam(): string | null {
  return tg()?.initDataUnsafe?.start_param ?? null;
}

export function getTgFirstName(): string | null {
  return tg()?.initDataUnsafe?.user?.first_name ?? null;
}

export function haptic(type: "success" | "error" | "warning"): void {
  tg()?.HapticFeedback?.notificationOccurred?.(type);
}

export function hapticTap(): void {
  tg()?.HapticFeedback?.impactOccurred?.("light");
}

/** Open a t.me share/invite link via the Telegram client when available. */
export function openTelegramLink(url: string): void {
  const w = tg();
  if (w?.openTelegramLink) w.openTelegramLink(url);
  else window.open(url, "_blank");
}

/** Open an external https link (e.g. a block explorer) in the system browser. */
export function openLink(url: string): void {
  const w = tg();
  if (w?.openLink) w.openLink(url);
  else window.open(url, "_blank");
}

// Thin wrapper around the Telegram Mini App SDK (loaded in index.html).

interface TgWebApp {
  initData: string;
  initDataUnsafe: {
    user?: { id: number; first_name?: string; username?: string };
    start_param?: string;
  };
  ready: () => void;
  expand: () => void;
  /** Stop the vertical drag from minimising the app so inner content can scroll (Bot API 7.7+). */
  disableVerticalSwipes?: () => void;
  /** Current viewport height in px — may shrink when the keyboard or Telegram chrome shows. */
  viewportHeight?: number;
  viewportStableHeight?: number;
  onEvent?: (event: string, cb: () => void) => void;
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
  // Without this, dragging up/down triggers Telegram's swipe-to-minimise gesture
  // instead of scrolling the page — the main cause of "scroll feels broken".
  w.disableVerticalSwipes?.();
  w.setHeaderColor?.("#0a0a0f");
  w.setBackgroundColor?.("#0a0a0f");

  // Mirror Telegram's real viewport height into a CSS var so layout matches the
  // visible area (100dvh can be wrong inside the Telegram WebView). Keep it in sync.
  const syncViewport = () => {
    const h = w.viewportStableHeight || w.viewportHeight;
    if (h) document.documentElement.style.setProperty("--tg-vh", `${h}px`);
  };
  syncViewport();
  w.onEvent?.("viewportChanged", syncViewport);
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

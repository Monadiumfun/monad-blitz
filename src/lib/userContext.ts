import { createContext, useContext } from "react";
import type { ApiUser } from "./api";

/** Provides the logged-in user to deep components (e.g. the in-game share card). */
export const UserContext = createContext<ApiUser | null>(null);

export function useUser(): ApiUser | null {
  return useContext(UserContext);
}

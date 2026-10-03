import { useCartStore } from "@/store/useCartStore";
import { useSyncExternalStore } from "react";

// True once the persisted cart has been loaded from localStorage
export const useCartHydrated = () =>
  useSyncExternalStore(
    (onChange) => useCartStore.persist.onFinishHydration(onChange),
    () => useCartStore.persist.hasHydrated(),
    () => false,
  );

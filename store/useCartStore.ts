import { CartItemType, ProductType } from "@/types/general-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  items: CartItemType[];
  isDrawerOpen: boolean;
  addToCart: (product: ProductType, quantity?: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const getUnitPrice = (product: ProductType) =>
  product.price * (1 - product.discountPercentage / 100);

const isValidCartItem = (item: unknown): item is CartItemType => {
  const candidate = item as CartItemType | null;
  return (
    typeof candidate?.quantity === "number" &&
    typeof candidate.product?.id === "number" &&
    typeof candidate.product.price === "number" &&
    typeof candidate.product.discountPercentage === "number"
  );
};

export const useCartStore =create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isDrawerOpen: false,
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.product.id === product.id);
          const maxQuantity = product.stock || Infinity;
          const items = existing
            ? state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: Math.min(item.quantity + quantity, maxQuantity) }
                  : item,
              )
            : [...state.items, { product, quantity: Math.min(quantity, maxQuantity) }];
          return { items, isDrawerOpen: true };
        }),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.product.id !== id)
              : state.items.map((item) =>
                  item.product.id === id
                    ? { ...item, quantity: Math.min(quantity, item.product.stock || Infinity) }
                    : item,
                ),
        })),
      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),
      clearCart: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
    }),
    {
      name: "mini-ecommerce-cart",
      // Only persist cart items, not the drawer's open state
      partialize: (state) => ({ items: state.items }),
      // Drop anything in storage that isn't a valid cart item (e.g. stale or foreign data)
      merge: (persisted, current) => {
        const saved = (persisted as Partial<CartState> | undefined)?.items;
        const items = Array.isArray(saved) ? saved.filter(isValidCartItem) : [];
        return { ...current, items };
      },
      // Rehydrated on the client in Providers to avoid SSR hydration mismatches
      skipHydration: true,
    },
  ),
);

export const selectTotalQuantity = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectSubtotal = (state: CartState) =>
  state.items.reduce((total, item) => total + getUnitPrice(item.product) * item.quantity, 0);

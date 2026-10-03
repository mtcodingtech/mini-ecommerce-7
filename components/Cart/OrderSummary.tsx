"use client";

import { selectSubtotal, useCartStore } from "@/store/useCartStore";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";

export const SHIPPING_FEE = 5;
export const FREE_SHIPPING_THRESHOLD = 100;

interface OrderSummaryProps {
  children?: React.ReactNode;
}

function OrderSummary({ children }: OrderSummaryProps) {
  const subtotal = useCartStore(selectSubtotal);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  return (
    <Paper
      elevation={0}
      sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: 2 }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Order summary
      </Typography>
      <Stack spacing={1.25}>
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Subtotal</Typography>
          <Typography>${subtotal.toFixed(2)}</Typography>
        </Stack>
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Shipping</Typography>
          <Typography>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</Typography>
        </Stack>
        {shipping > 0 && (
          <Typography variant="caption" color="text.secondary">
            Free shipping on orders over ${FREE_SHIPPING_THRESHOLD}.
          </Typography>
        )}
        <Divider />
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: 700 }}>Total</Typography>
          <Typography sx={{ fontWeight: 700 }}>${total.toFixed(2)}</Typography>
        </Stack>
      </Stack>
      {children && <Stack spacing={1.5} sx={{ mt: 3 }}>{children}</Stack>}
    </Paper>
  );
}

export default OrderSummary;

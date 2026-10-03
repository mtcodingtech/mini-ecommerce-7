"use client";

import { selectSubtotal, selectTotalQuantity, useCartStore } from "@/store/useCartStore";
import Close from "@mui/icons-material/Close";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import CartItem from "./CartItem";

function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer } = useCartStore();
  const totalQuantity = useCartStore(selectTotalQuantity);
  const subtotal = useCartStore(selectSubtotal);

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={closeDrawer}
      slotProps={{ paper: { sx: { width: { xs: "100%", sm: 400 } } } }}
    >
      <Stack sx={{ height: "100%" }}>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            py: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Your cart ({totalQuantity})
          </Typography>
          <IconButton aria-label="Close cart" onClick={closeDrawer}>
            <Close />
          </IconButton>
        </Stack>
        <Divider />

        {items.length === 0 ? (
          <Stack
            sx={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              px: 3,
              textAlign: "center",
            }}
          >
            <ShoppingBagOutlined sx={{ fontSize: 56, color: "text.disabled" }} />
            <Typography color="text.secondary">Your cart is empty.</Typography>
            <Button variant="outlined" onClick={closeDrawer}>
              Continue shopping
            </Button>
          </Stack>
        ) : (
          <>
            <Box sx={{ flex: 1, overflowY: "auto", px: 2.5 }}>
              {items.map((item, index) => (
                <Box key={item.product.id}>
                  {index > 0 && <Divider />}
                  <CartItem item={item} />
                </Box>
              ))}
            </Box>
            <Divider />
            <Stack spacing={1.5} sx={{ p: 2.5 }}>
              <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography sx={{ fontWeight: 700 }}>${subtotal.toFixed(2)}</Typography>
              </Stack>
              <Button
                component={Link}
                href="/checkout"
                variant="contained"
                size="large"
                onClick={closeDrawer}
              >
                Checkout
              </Button>
              <Button component={Link} href="/cart" variant="outlined" onClick={closeDrawer}>
                View cart
              </Button>
            </Stack>
          </>
        )}
      </Stack>
    </Drawer>
  );
}

export default CartDrawer;

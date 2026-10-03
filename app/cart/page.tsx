"use client";

import CartItem from "@/components/Cart/CartItem";
import OrderSummary from "@/components/Cart/OrderSummary";
import { useCartHydrated } from "@/hooks/useCartHydrated";
import { useCartStore } from "@/store/useCartStore";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

function CartPage() {
  const { items, clearCart } = useCartStore();
  const isHydrated = useCartHydrated();

  if (!isHydrated) {
    return (
      <Stack sx={{ alignItems: "center", py: 10 }}>
        <CircularProgress aria-label="Loading cart" />
      </Stack>
    );
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Stack sx={{ alignItems: "center", gap: 2, textAlign: "center" }}>
          <ShoppingBagOutlined sx={{ fontSize: 64, color: "text.disabled" }} />
          <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
            Your cart is empty
          </Typography>
          <Typography color="text.secondary">
            Browse our products and add something you like.
          </Typography>
          <Button component={Link} href="/" variant="contained">
            Start shopping
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
          Shopping cart
        </Typography>
        <Button color="error" onClick={clearCart}>
          Clear cart
        </Button>
      </Stack>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, px: 2.5 }}>
            {items.map((item, index) => (
              <Box key={item.product.id}>
                {index > 0 && <Divider />}
                <CartItem item={item} imageSize={96} />
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <OrderSummary>
            <Button component={Link} href="/checkout" variant="contained" size="large">
              Proceed to checkout
            </Button>
            <Button component={Link} href="/" variant="text">
              Continue shopping
            </Button>
          </OrderSummary>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CartPage;

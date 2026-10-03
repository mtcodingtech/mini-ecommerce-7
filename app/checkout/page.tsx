"use client";

import OrderSummary from "@/components/Cart/OrderSummary";
import { useCartHydrated } from "@/hooks/useCartHydrated";
import { getUnitPrice, useCartStore } from "@/store/useCartStore";
import CheckCircleOutlined from "@mui/icons-material/CheckCircleOutlined";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

type ShippingForm = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: "cod" | "card";
};

const initialForm: ShippingForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  paymentMethod: "cod",
};

type FormErrors = Partial<Record<keyof ShippingForm, string>>;

const validate = (form: ShippingForm): FormErrors => {
  const errors: FormErrors = {};
  if (!form.fullName.trim()) errors.fullName = "Full name is required";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Enter a valid email";
  if (!/^[0-9+\-\s]{6,}$/.test(form.phone)) errors.phone = "Enter a valid phone number";
  if (!form.address.trim()) errors.address = "Address is required";
  if (!form.city.trim()) errors.city = "City is required";
  return errors;
};

function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const isHydrated = useCartHydrated();
  const [form, setForm] = useState<ShippingForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleChange =
    (field: keyof ShippingForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // No backend yet: simulate placing the order
    setOrderId(`ORD-${Date.now().toString().slice(-6)}`);
    clearCart();
  };

  if (orderId) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Stack sx={{ alignItems: "center", gap: 2, textAlign: "center" }}>
          <CheckCircleOutlined color="success" sx={{ fontSize: 72 }} />
          <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
            Thank you for your order!
          </Typography>
          <Typography color="text.secondary">
            Your order <strong>{orderId}</strong> has been placed. A confirmation
            will be sent to {form.email}.
          </Typography>
          <Button component={Link} href="/" variant="contained">
            Continue shopping
          </Button>
        </Stack>
      </Container>
    );
  }

  if (!isHydrated) {
    return (
      <Stack sx={{ alignItems: "center", py: 10 }}>
        <CircularProgress aria-label="Loading checkout" />
      </Stack>
    );
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Stack sx={{ alignItems: "center", gap: 2, textAlign: "center" }}>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
            Nothing to check out
          </Typography>
          <Typography color="text.secondary">Your cart is empty.</Typography>
          <Button component={Link} href="/" variant="contained">
            Start shopping
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography component="h1" variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Checkout
      </Typography>

      <Grid container spacing={4} component="form" noValidate onSubmit={handleSubmit}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            elevation={0}
            sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: 2 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Shipping details
            </Typography>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  label="Full name"
                  fullWidth
                  required
                  value={form.fullName}
                  onChange={handleChange("fullName")}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  value={form.email}
                  onChange={handleChange("email")}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Phone"
                  type="tel"
                  fullWidth
                  required
                  value={form.phone}
                  onChange={handleChange("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Address"
                  fullWidth
                  required
                  value={form.address}
                  onChange={handleChange("address")}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="City"
                  fullWidth
                  required
                  value={form.city}
                  onChange={handleChange("city")}
                  error={!!errors.city}
                  helperText={errors.city}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Postal code"
                  fullWidth
                  value={form.postalCode}
                  onChange={handleChange("postalCode")}
                />
              </Grid>
            </Grid>

            <FormControl sx={{ mt: 3 }}>
              <FormLabel id="payment-method-label">Payment method</FormLabel>
              <RadioGroup
                aria-labelledby="payment-method-label"
                value={form.paymentMethod}
                onChange={handleChange("paymentMethod")}
              >
                <FormControlLabel value="cod" control={<Radio />} label="Cash on delivery" />
                <FormControlLabel value="card" control={<Radio />} label="Credit / debit card" />
              </RadioGroup>
            </FormControl>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={2}>
            <Paper
              elevation={0}
              sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: 2 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Items ({items.length})
              </Typography>
              <Stack spacing={1.5}>
                {items.map(({ product, quantity }) => (
                  <Stack
                    key={product.id}
                    sx={{ flexDirection: "row", alignItems: "center", gap: 1.5 }}
                  >
                    <Box
                      component="img"
                      src={product.thumbnail}
                      alt={product.title}
                      sx={{
                        width: 48,
                        height: 48,
                        objectFit: "contain",
                        bgcolor: "#f5f4f0",
                        borderRadius: 1,
                      }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" noWrap sx={{ fontWeight: 600 }}>
                        {product.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Qty {quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ${(getUnitPrice(product) * quantity).toFixed(2)}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Paper>
            <OrderSummary>
              <Button type="submit" variant="contained" size="large">
                Place order
              </Button>
              <Button component={Link} href="/cart" variant="text">
                Back to cart
              </Button>
            </OrderSummary>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CheckoutPage;

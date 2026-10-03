"use client";

import { getUnitPrice, useCartStore } from "@/store/useCartStore";
import { CartItemType } from "@/types/general-types";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import QuantitySelector from "./QuantitySelector";

interface CartItemProps {
  item: CartItemType;
  imageSize?: number;
}

function CartItem({ item, imageSize = 72 }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCartStore();
  const { product, quantity } = item;
  const unitPrice = getUnitPrice(product);

  return (
    <Stack sx={{ flexDirection: "row", gap: 2, py: 2 }}>
      <Box
        component="img"
        src={product.thumbnail}
        alt={product.title}
        sx={{
          width: imageSize,
          height: imageSize,
          objectFit: "contain",
          bgcolor: "#f5f4f0",
          borderRadius: 1.5,
          p: 0.75,
          flexShrink: 0,
        }}
      />
      <Stack sx={{ flex: 1, minWidth: 0, gap: 1 }}>
        <Stack sx={{ flexDirection: "row", alignItems: "flex-start", gap: 1 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography noWrap sx={{ fontWeight: 600 }}>
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${unitPrice.toFixed(2)} each
            </Typography>
          </Box>
          <IconButton
            size="small"
            aria-label={`Remove ${product.title} from cart`}
            onClick={() => removeFromCart(product.id)}
          >
            <DeleteOutlined fontSize="small" />
          </IconButton>
        </Stack>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <QuantitySelector
            quantity={quantity}
            max={product.stock || undefined}
            label={product.title}
            onChange={(next) => updateQuantity(product.id, next)}
          />
          <Typography sx={{ fontWeight: 700 }}>
            ${(unitPrice * quantity).toFixed(2)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default CartItem;

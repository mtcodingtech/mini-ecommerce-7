"use client";

import { getUnitPrice, useCartStore } from "@/store/useCartStore";
import { ProductType } from "@/types/general-types";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface ProductCardProps {
  product: ProductType;
}

function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const discountedPrice = getUnitPrice(product);
  const isOutOfStock = product.stock === 0;

  return (
    <Card
      component="article"
      elevation={0}
      sx={{
        height: "100%",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        transition: "border-color 180ms ease, transform 180ms ease",
        "&:hover": {
          borderColor: "text.secondary",
          transform: "translateY(-3px)",
        },
      }}
    >
      <Box sx={{ position: "relative", bgcolor: "#f5f4f0" }}>
        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.title}
          sx={{ height: 230, objectFit: "contain", p: 2.5 }}
        />
        <Chip
          size="small"
          label={`-${Math.round(product.discountPercentage)}%`}
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            bgcolor: "#d84f35",
            color: "common.white",
            fontWeight: 700,
          }}
        />
        <IconButton
          aria-label={
            isFavorite
              ? `Remove ${product.title} from favorites`
              : `Add ${product.title} to favorites`
          }
          aria-pressed={isFavorite}
          onClick={() => setIsFavorite((favorite) => !favorite)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "background.paper",
            "&:hover": { bgcolor: "background.paper", color: "#d84f35" },
          }}
        >
          {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      </Box>

      <Stack spacing={1} sx={{ p: 2 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ lineHeight: 1.4, textTransform: "capitalize" }}
        >
          {product.category.replaceAll("-", " ")}
        </Typography>
        <Typography
          component="h2"
          variant="subtitle1"
          noWrap
          sx={{ fontWeight: 650 }}
        >
          {product.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            minHeight: 40,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {product.description}
        </Typography>

        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75 }}>
          <Rating
            value={product.rating}
            precision={0.1}
            size="small"
            readOnly
          />
          <Typography variant="caption" color="text.secondary">
            {product.rating.toFixed(1)}
          </Typography>
        </Stack>

        <Stack
          sx={{ flexDirection: "row", alignItems: "baseline", gap: 1, pt: 0.5 }}
        >
          <Typography variant="h6" component="p" sx={{ fontWeight: 700 }}>
            ${discountedPrice.toFixed(2)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: "line-through" }}
          >
            ${product.price.toFixed(2)}
          </Typography>
        </Stack>

        <Button
          variant="contained"
          startIcon={<AddShoppingCart />}
          disabled={isOutOfStock}
          onClick={() => addToCart(product)}
          sx={{ mt: 1 }}
        >
          {isOutOfStock ? "Out of stock" : "Add to cart"}
        </Button>
      </Stack>
    </Card>
  );
}

export default ProductCard;

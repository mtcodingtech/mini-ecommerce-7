"use client";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";
import { ProductType } from "@/types/general-types";
import { Alert, Container, Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

function Products() {
  const { data: productData, isLoading, isError } = useProductsByCategory();

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 5 }} aria-busy>
        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          Shop products
        </Typography>
        <Grid container spacing={2.5}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Alert severity="error">Products could not be loaded. Please try again.</Alert>
      </Container>
    );
  }

  const products: ProductType[] = productData?.products ?? [];

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Shop products
      </Typography>
      {products.length === 0 ? (
        <Typography color="text.secondary">No products found in this category.</Typography>
      ) : (
        <Grid container spacing={2.5}>
          {products.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Products;

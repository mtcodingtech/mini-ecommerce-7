import { Box, Card, Skeleton, Stack } from "@mui/material";

function ProductCardSkeleton() {
  return (
    <Card
      elevation={0}
      aria-hidden
      sx={{
        height: "100%",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Box sx={{ bgcolor: "#f5f4f0", p: 2.5 }}>
        <Skeleton variant="rounded" height={190} />
      </Box>

      <Stack spacing={1} sx={{ p: 2 }}>
        <Skeleton variant="text" width="35%" />
        <Skeleton variant="text" width="80%" sx={{ fontSize: "1.1rem" }} />
        <Box sx={{ minHeight: 40 }}>
          <Skeleton variant="text" />
          <Skeleton variant="text" width="60%" />
        </Box>
        <Skeleton variant="text" width="45%" />
        <Stack sx={{ flexDirection: "row", gap: 1, pt: 0.5 }}>
          <Skeleton variant="text" width={70} sx={{ fontSize: "1.5rem" }} />
          <Skeleton variant="text" width={50} />
        </Stack>
      </Stack>
    </Card>
  );
}

export default ProductCardSkeleton;

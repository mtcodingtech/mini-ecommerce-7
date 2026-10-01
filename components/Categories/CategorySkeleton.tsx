import { Grid, Skeleton } from "@mui/material";

function CategorySkeleton() {
  return (
    <Grid
      size={2}
      aria-hidden
      sx={{
        py: "3rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="text" width="60%" sx={{ mt: 0.5 }} />
    </Grid>
  );
}

export default CategorySkeleton;

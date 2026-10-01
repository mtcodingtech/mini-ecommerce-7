import { categoriesImages } from "@/dummyData";
import { useCategoryStore } from "@/store/useCategoryStore";
import { CategoryType } from "@/types/general-types";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

interface CategoryProps {
  category: CategoryType;
  index: number;
  isLastChild: boolean;
}

function Category({ category, index, isLastChild }: CategoryProps) {
  const { selectedCategory, setSelectedCategory } = useCategoryStore();
  const isActive = selectedCategory === category.slug;

  return (
    <>
      <Grid
        size={2}
        sx={{
          background: isActive ? "green" : "#fff",
          position: "relative",
          py: "3rem",

          "&::after": {
            content: "''",
            width: isLastChild ? 0 : "1px",
            height: "80px",
            background: isActive ? "green" : "grey",
            position: "absolute",
            margin: "auto",
            top: 0,
            bottom: 0,
            right: 0,
          },
        }}
        onClick={() => setSelectedCategory(category.slug)}
      >
        <Image
          src={categoriesImages[index]}
          alt=""
          width={500}
          height={500}
          className="w-10 mx-auto"
        />
        <Typography sx={{ textAlign: "center" }}>{category.name}</Typography>
      </Grid>
    </>
  );
}

export default Category;
